var geraBioma = function (opcoes) {
    //'earth', "volcanic", "jungle", "icy", "desert", "islands", "moon"
    var noiseTexture;
    var cloudTexture;
    
    var random = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);
    var random2 = new BABYLON.DynamicTexture("random", 512, scene, false, BABYLON.Texture.NEAREST_SAMPLINGMODE);

    atualizaTextura(random);
    atualizaTextura(random2);
    
    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "./planet",
        fragment: "./planet",
    },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"],
            needAlphaBlending: true
        });
    shaderMaterial.setVector3("cameraPosition", camera.position);
    shaderMaterial.setVector3("lightPosition", sun.position);

    noiseTexture = new BABYLON.ProceduralTexture("noise", 1024, "./shaders/noise", scene, null, true, true);
    noiseTexture.setColor3("upperColor", opcoes.upperColor);
    noiseTexture.setColor3("lowerColor", opcoes.lowerColor);
    noiseTexture.setFloat("mapSize", 1024);
    noiseTexture.setFloat("maxResolution", 128);
    noiseTexture.setFloat("seed", opcoes.gerador);
    noiseTexture.setVector2("lowerClamp", opcoes.lowerClamp);
    noiseTexture.setTexture("randomSampler", random);
    noiseTexture.setVector2("range", opcoes.distancia);
    noiseTexture.setVector3("options", new BABYLON.Vector3(opcoes.directNoise ? 1.0 : 0, opcoes.lowerClip.x, opcoes.lowerClip.y));
    noiseTexture.refreshRate = 0;

    shaderMaterial.setTexture("textureSampler", noiseTexture);

    cloudTexture = new BABYLON.ProceduralTexture("cloud", 512, "./shaders/noise", scene, null, true, true);
    cloudTexture.setTexture("randomSampler", random2);
    cloudTexture.setFloat("mapSize", 512);
    cloudTexture.setFloat("maxResolution", 256);
    cloudTexture.setFloat("seed", opcoes.geradorNuvens);
    cloudTexture.setVector3("options", new BABYLON.Vector3(1.0, 0, 1.0));
    cloudTexture.refreshRate = 0;

    shaderMaterial.setTexture("cloudSampler", cloudTexture);

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
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 10000.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    var files = [
        "texturas/espaco/space_left.jpg",
        "texturas/espaco/space_up.jpg",
        "texturas/espaco/space_front.jpg",
        "texturas/espaco/space_right.jpg",
        "texturas/espaco/space_down.jpg",
        "texturas/espaco/space_back.jpg",
    ];
    skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
}

