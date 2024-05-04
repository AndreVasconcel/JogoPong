let x = 0;

//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//Velocidade da Bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//Variáveis da Raquete
let xRaquete = 1;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis do oponente
let xRaqueteOponente = 589;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;
let chanceDeErrar = 0;
//Placar do Jogo
let meusPontos = 0;
let pontosOponente = 0;

//variáveis de som
let trilha;
let ponto;
let raquetada;

function preload(){
    trilha = loadSound("Sons/trilha.mp3");
    ponto = loadSound("Sons/ponto.mp3");
    raquetada = loadSound("Sons/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
  trilha.setVolume(0.07);
  ponto.setVolume(0.07);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
} 

function jogar() {
    trilha.setVolume(0.07);
    return x=1;
}

function pausar() {
    trilha.setVolume(0);
    return x=0;
}

function novoJogo() {
    yBolinha = 200;
    xBolinha = 300;
    yRaquete = 150;
    xRaquete = 1;
    yRaqueteOponente = 150;
    xRaqueteOponente = 589;
    meusPontos = 0;
    pontosOponente = 0;
    x=0;
}

function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
    if (x==1) {
        xBolinha += velocidadeXBolinha;
        yBolinha += velocidadeYBolinha;
    }
}

function verificaColisaoBorda() {
    if (xBolinha + raio> width || xBolinha - raio< 0) {
        velocidadeXBolinha *= -1;
    }
    
    if (yBolinha + raio> height || yBolinha - raio< 0) {
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(x, y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}
  
function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW) && yRaquete!=0){
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW) && yRaquete!=310){
        yRaquete += 10;
    }

}

function movimentaRaqueteOponente() {
    if (keyIsDown(87) && yRaqueteOponente!=0){
        yRaqueteOponente -= 10;
    }
    if (keyIsDown(83) && yRaqueteOponente!=310){
        yRaqueteOponente += 10;
    }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function incluiPlacar() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));  
    rect(150, 10, 40, 20);
    fill(255); 
    text(meusPontos, 170, 26);
    fill(color(255, 140, 0));  
    rect(450, 10, 40, 20);
    fill(255); 
    text(pontosOponente, 470, 26);
}

function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }

    if (xBolinha < 10) {
        pontosOponente += 1;
        ponto.play();
    }
}


