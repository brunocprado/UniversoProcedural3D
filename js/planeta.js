var Planeta = function(nome,op){
    this.nome = nome;
    this.posOrbita = Math.random() * 5 ;
    this.orbita = ((Math.floor(Math.random() * 8000000) + 4000000) /20000) * 2;  //EM KM //TODO : IMPLEMENTAR AFELIO e PERIELIO
    this.diametro = (Math.floor(Math.random() * 160000) + 9000) / 10000;  //EM KM
    this.velocidade = Math.random() + 1;
    
    this.geraPlaneta = function(){
        if(op != null) return op;
        
        var opcoes = new Object();
        
        opcoes.nuvens = (Math.random() > 0.5);
        opcoes.rings = false;
        
        opcoes.resolucao = 1024;
        
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
};