var Estrela = function(nome){
    this.nome = nome;
    this.posOrbita = Math.random() * 5 ;
    this.orbita = Math.floor(Math.random() * parametros.tamMaxOrbita) + parametros.tamMinOrbita;  //AFELIO
    this.perielio = Math.random() * (0.95 - 0.25) + 0.25;  //PERIELIO
    this.diametro = Math.floor(Math.random() * 250) + 80;  //EM KM
    this.velocidade = Math.random() + 1;
        
    this.globo = null;
    
    this.renderiza = function(){
//        var estrela = BABYLON.Mesh.CreateSphere('sol', 40, this.diametro, scene);
        var estrela = BABYLON.Mesh.CreateSphere('sol', 40, 139.2, scene);
//        estrela.position.x = Math.random() * 1000000 - 500000;
//        estrela.position.y = Math.random() * 1000000 - 500000;
//        estrela.position.z = Math.random() * 1000000 - 500000;
        estrela.position.x = 0;
        estrela.position.y = 0;
        estrela.position.z = 0;
        estrela.material = texturas["sol"];
        
        estrela.checkCollisions = true;
        estrela.isBlocker = true;
           
        this.globo = estrela;
        
//        var luz = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, estrela, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
//
//        luz._volumetricLightScatteringRTT.renderParticles = true;
//        luz.exposure = Math.random() * (0.30 - 0.08) + 0.08;
//        luz.decay = 0.96815;
//        luz.weight = 0.98767;
//        luz.density = 1;
//        
    };
};