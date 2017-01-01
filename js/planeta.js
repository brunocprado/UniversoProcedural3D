var Planeta = function(nome,op,estrela){
    this.nome = nome;
    this.tipo = "Planeta";
    this.posOrbita = Math.random() * 5 ;
    this.orbita = Math.floor(Math.random() * parametros.tamMaxOrbita) + parametros.tamMinOrbita;  //AFELIO
    this.perielio = Math.random() * (0.95 - 0.75) + 0.75;  //PERIELIO
    this.diametro = (Math.floor(Math.random() * 160000) + 9000) / 10000;  //EM KM
    this.velocidade = Math.random() + 1;
    
    this.geraPlaneta = function(){
        if(op != null) return op;
        
        //TODO : GERAR BIOMA BASEADO NA PROXIMIDADE DA ESTRELA
        
        var opcoes = new Object();
        
        opcoes.nuvens = (Math.random() > 0.5);
        opcoes.rings = false;
                
        opcoes.gerador = Math.random();
        opcoes.geradorNuvens = Math.random();
        opcoes.velRotacao = 0.04;
        
        opcoes.upperColor = new BABYLON.Color3(Math.random() * 2, Math.random(), Math.random());
        opcoes.lowerColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        opcoes.haloColor  = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        
        opcoes.lowerClamp = new BABYLON.Vector2(Math.random(), Math.random()),
        opcoes.groundAlbedo= Math.random() * 2,
        opcoes.cloudAlbedo = Math.random(),
        opcoes.directNoise = false,
        opcoes.lowerClip = new BABYLON.Vector2(0, 0),
        opcoes.distancia = new BABYLON.Vector2(Math.random(), Math.random())
        
        return opcoes;
    };
    
    this.opcoes = this.geraPlaneta();
    this.globo = null;
    
    this.renderiza = function(){
        var planeta = BABYLON.Mesh.CreateSphere(this.nome, 32, this.diametro, scene);
        planeta.parent = estrela;

        planeta.material = geraBioma(this.opcoes);    
        this.globo = planeta;

        planeta.isBlocker = true;
        planeta.checkCollisions = true;
        planeta.info = this;

        //CRIA ORBITA if(mostraOrbita)
        var orbita = BABYLON.Mesh.CreateTorus("torus", this.orbita * 2, 0.3, 110, scene, false);
        orbita.parent = estrela;
        orbita.scaling = new BABYLON.Vector3(1, 1, this.perielio);
        orbita.position.y = 10 - (planeta.getBoundingInfo().boundingBox.extendSize.y * 1.2);
        orbita.material = materialOrbita;
        orbita.isBlocker = false;
        
//        planeta.simplify([{ quality: 0.8, distance: 250 }, { quality: 0.5, distance: 350 }, { quality: 0.2, distance: 450 }, { quality: 0.1, distance: 600 }], true, BABYLON.SimplificationType.QUADRATIC, null);
        
    };
};