var texturas = new Object();
var planetas = [];

var canvas = document.getElementById('canvas');
var engine = new BABYLON.Engine(canvas, true);

var scene = new BABYLON.Scene(engine);

document.getElementById("canvas").focus();

carregaTexturas();

var camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 180,-800), scene);
camera.setTarget(new BABYLON.Vector3(300, 0,0));
camera.attachControl(canvas, true);
////camera.lowerRadiusLimit = 50;
////camera.upperRadiusLimit = 600;
//camera.maxZ = 0;
camera.speed = 10;

var luzGlobal = new BABYLON.HemisphericLight("LuzGlobal", new BABYLON.Vector3(0, 0, 0), scene);
luzGlobal.diffuse = new BABYLON.Color3(1, 1, 1);
luzGlobal.specular = new BABYLON.Color3(0, 0, 0);
luzGlobal.groundColor = new BABYLON.Color3(0, 0, 0);

var materialOrbita = new BABYLON.StandardMaterial("orbita", scene);
    materialOrbita.diffuseColor = new BABYLON.Color3(1, 1, 0); 
    materialOrbita.alpha = 0.4;

//=====| CENA |=====//

var SOL = new Estrela("sol");
SOL.renderiza(); SOL.renderiza();

var sol = SOL.globo;

var luzSolar = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, sol, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

luzSolar._volumetricLightScatteringRTT.renderParticles = true;
luzSolar.exposure = 0.12;
luzSolar.decay = 0.96815;
luzSolar.weight = 0.98767;
luzSolar.density = 1;

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

for(var i=0;i<4;i++){
    planetas.push(new Planeta("novo",null));
}

console.log(planetas);
for(var i=0;i<planetas.length;i++){
    planetas[i].renderiza();
}


var angle = 0;
scene.registerBeforeRender(function () {
    var ratio = scene.getAnimationRatio();
    
    for(var i=0;i<planetas.length;i++){
        var planet = planetas[i].globo;
        planet.rotation.y += parametros.velRotacao * ratio;
        
        planet.position = new BABYLON.Vector3(Math.cos(planetas[i].posOrbita) * planetas[i].orbita, 10, Math.sin(planetas[i].posOrbita) * planetas[i].orbita * planetas[i].perielio);
        planetas[i].posOrbita += parametros.velTranslacao * ratio * planetas[i].velocidade;
        
        planet.material.setMatrix("rotation", BABYLON.Matrix.RotationY(angle));
        angle -= 0.0004 * ratio;

        planet.material.setVector3("options", new BABYLON.Vector3(planetas[i].opcoes.nuvens, planetas[i].opcoes.groundAlbedo, planetas[i].opcoes.cloudAlbedo));
    }
});

    
var click = function(evt){
    if (evt.button !== 0) { 
        scene.debugLayer.show(); evt.preventDefault();  return; 
    } //engine.switchFullscreen(true);
    var pick = scene.pick(scene.pointerX, scene.pointerY, function (mesh){ return mesh; });
//    if(pick.pickedMesh.info != null){
//        console.log(pick.pickedMesh.info);
//         console.log(pick.pickedMesh.position);
////        alert("clicou no planeta");
//    }
}
canvas.addEventListener("pointerdown", click, false);

BABYLON.Engine.ShadersRepository = "shaders/";

function carregaTexturas(){
    texturas["sol"] = new BABYLON.StandardMaterial("sol", scene);
    texturas["sol"].diffuseTexture = new BABYLON.Texture("texturas/sol.jpg", scene);
//    texturas["sol"].reflectionTexture = new BABYLON.Texture("texturas/terra.png", scene);
}

skybox();

engine.runRenderLoop(function(){
    fps.innerHTML = engine.getFps().toFixed() + " fps";

    scene.render();
});

window.addEventListener('resize', function(){
    engine.resize();
});

