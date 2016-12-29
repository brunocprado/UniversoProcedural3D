var texturas = new Object();
var planetas = [];

var canvas = document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas, true);

var scene = new BABYLON.Scene(engine);

document.getElementById("canvas").focus();

carregaTexturas();

var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 180,-820), scene);
camera.setTarget(new BABYLON.Vector3(300, 0,0));
camera.attachControl(canvas, true);
camera.lowerRadiusLimit = 50;
camera.upperRadiusLimit = 600;
camera.maxZ = 12000;
camera.speed = 10;

scene.clearColor = new BABYLON.Color3(0, 0, 0);
scene.collisionsEnabled = true;
camera.checkCollisions = true;
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);

var light1 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light1.diffuse = new BABYLON.Color3(1, 1, 1);
light1.specular = new BABYLON.Color3(1, 1, 1);
light1.groundColor = new BABYLON.Color3(0, 0, 0);

var materialOrbita = new BABYLON.StandardMaterial("orbita", scene);
    materialOrbita.diffuseColor = new BABYLON.Color3(1, 1, 0); 
    materialOrbita.alpha = 0.2;


var sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(6, 0, 0), scene);

var sol = BABYLON.Mesh.CreateSphere('sol', 50, 139.2, scene);
sol.material = texturas["sol"];
sol.checkCollisions = true;


planetas.push(new Planeta("a",{
    nuvens: true,
    upperColor: new BABYLON.Color3(2.0, 1.0, 0),
    lowerColor: new BABYLON.Color3(0, 0.2, 1.0),
    haloColor: new BABYLON.Color3(0, 0.2, 1.0),
    gerador: 0.30,
    geradorNuvens: 0.55,
    lowerClamp: new BABYLON.Vector2(0.6, 1),
    groundAlbedo: 1.2,
    cloudAlbedo: 1.0,
    rings: true,
    ringsColor: new BABYLON.Color3(0.6, 0.6, 0.6),
    directNoise: false,
    lowerClip: new BABYLON.Vector2(0, 0),
    distancia: new BABYLON.Vector2(0.3, 0.35)
}));


var t = new Planeta("b",null);

planetas.push(t);


var ta = new Planeta("c",null);

planetas.push(ta);

console.log(planetas);
for(var i=0;i<planetas.length;i++){
    var planeta = BABYLON.Mesh.CreateSphere(planetas[i].nome, 32, planetas[i].diametro, scene);
    planeta.parent = sol;
    
    planeta.material = geraBioma(planetas[i].opcoes);    
    planetas[i].globo = planeta;

    planeta.isBlocker = true;
    planeta.checkCollisions = true;
    planeta.info = planetas[i];
    
    //CRIA ORBITA if(mostraOrbita)
    var orbita = BABYLON.Mesh.CreateTorus("torus", planetas[i].orbita * 2, 0.15, 150, scene, false);
    orbita.position.y = 10 - (planeta.getBoundingInfo().boundingBox.extendSize.y * 1.2);
    orbita.material = materialOrbita;
    
    
    //TESTE
//    planetas[i].globo.actionManager = new BABYLON.ActionManager(scene);
//    planetas[i].globo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
//		console.log(this);
//	}));
}

var onPointerDown = function(evt){
    if (evt.button !== 0) {
        return;
    }
    var pick = scene.pick(scene.pointerX, scene.pointerY, function (mesh){ return mesh; });
    if(pick.pickedMesh.info != null){
        console.log(pick.pickedMesh.info);
        alert("clicou no planeta");
    }
}

var angle = 0;
scene.registerBeforeRender(function () {
    var ratio = scene.getAnimationRatio();
    
    for(var i=0;i<planetas.length;i++){
        var planet = planetas[i].globo;
        planet.rotation.y += 0.001 * ratio;
        
        planet.position = new BABYLON.Vector3(Math.cos(planetas[i].posOrbita) * planetas[i].orbita, 10, Math.sin(planetas[i].posOrbita) * planetas[i].orbita);
        planetas[i].posOrbita += 0.001 * ratio * planetas[i].velocidade;
        
        planet.material.setMatrix("rotation", BABYLON.Matrix.RotationY(angle));
        angle -= 0.0004 * ratio;

        planet.material.setVector3("options", new BABYLON.Vector3(planetas[i].opcoes.nuvens, planetas[i].opcoes.groundAlbedo, planetas[i].opcoes.cloudAlbedo));
    }
});

    

    


canvas.addEventListener("pointerdown", onPointerDown, false);



BABYLON.Engine.ShadersRepository = "shaders/";

function carregaTexturas(){
    texturas["sol"] = new BABYLON.StandardMaterial("sol", scene);
    texturas["sol"].diffuseTexture = new BABYLON.Texture("texturas/sol.jpg", scene);
    
//    texturas["terra"] = new BABYLON.StandardMaterial("terra", scene);
//    texturas["terra"].diffuseTexture = new BABYLON.Texture("texturas/teste.png", scene);   
}

skybox();

engine.runRenderLoop(function(){
    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});