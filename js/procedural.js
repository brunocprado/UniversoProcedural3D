var geraBioma = function (opcoes) {
    var texturaMundo;
    var texturaNuvens;
    
    var random = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
    var random2 = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);

    atualizaTextura(random);
    atualizaTextura(random2);
    
    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "./shaders/planet",
        fragment: "./shaders/planet",
    },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true
        });
    shaderMaterial.setVector3("cameraPosition", camera.position);
    shaderMaterial.setVector3("lightPosition", sol.position);

    texturaMundo = new BABYLON.ProceduralTexture("noise", parametros.qualidadeTexturas, "./shaders/noise", scene, null, true, true);
    texturaMundo.setColor3("upperColor", opcoes.upperColor);
    texturaMundo.setColor3("lowerColor", opcoes.lowerColor);
    texturaMundo.setFloat("mapSize", parametros.qualidadeTexturas);
    texturaMundo.setFloat("maxResolution", 128);
    texturaMundo.setFloat("seed", opcoes.gerador);
    texturaMundo.setVector2("lowerClamp", opcoes.lowerClamp);
    texturaMundo.setTexture("randomSampler", random);
    texturaMundo.setVector2("range", opcoes.distancia);
    texturaMundo.setVector3("options", new BABYLON.Vector3(opcoes.directNoise ? 1.0 : 0, opcoes.lowerClip.x, opcoes.lowerClip.y));
    texturaMundo.refreshRate = 0;

    shaderMaterial.setTexture("textureSampler", texturaMundo);

    texturaNuvens = new BABYLON.ProceduralTexture("cloud", 512, "./shaders/noise", scene, null, true, true);
    texturaNuvens.setTexture("randomSampler", random2);
    texturaNuvens.setFloat("mapSize", 512);
    texturaNuvens.setFloat("maxResolution", 256);
    texturaNuvens.setFloat("seed", opcoes.geradorNuvens);
    texturaNuvens.setVector3("options", new BABYLON.Vector3(1.0, 0, 1.0));
    texturaNuvens.refreshRate = 0;

    shaderMaterial.setTexture("cloudSampler", texturaNuvens);

    shaderMaterial.setColor3("haloColor", opcoes.haloColor);

    return shaderMaterial;
};


var atualizaTextura = function (random) {
    var context = random.getContext();

    var data = context.getImageData(0, 0, 512, 512);

    for (var i = 0; i < 512 * 512 * 4; i++) {
        data.data[i] = (Math.random() * 256) | 0;
    }

    context.putImageData(data, 0, 0);
    random.update();
}

function skybox(){
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 20000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    var files = [
        "texturas/espaco/1l.jpg",
        "texturas/espaco/2l.jpg",
        "texturas/espaco/3l.jpg",
        "texturas/espaco/4l.jpg",
        "texturas/espaco/5l.jpg",
        "texturas/espaco/6l.jpg",
    ];
    skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
}

