let xBolinha = 300
let yBolinha = 200
let diametro = 20
let raio = diametro / 2

let velocidadeXbolinha = 6
let velocidaeYBolinha = 6

let xRaquete = 5
let yRaquete = 150

let raqueteComprimento = 10
let raqueteAltura = 90

let xRaqueteOponente = 585
let yRaqueteOponente = 150
let chanceDeErrar = 0
let velocidadeYOponente

let colidiu = false

let meusPontos = 0
let pontosDoOponente = 0

//let raquetada
//let ponto
//let trilha

/*function preload() {
  trilha = loadSound('trilha.mp3')
  ponto = loadSound('ponto.mp3')
  raquetada = loadSound('raquetada.mp3')
}*/

function setup() {
  createCanvas(600, 400)
  //trilha.loop()
}

function draw() {
  background(0)
  mostraBolinha()
  movimentaBolinha()
  VerificaColisaoBordas()
  mostrarRaquete(xRaquete, yRaquete)
  movimentaMinhaRaquete()
  //verificaColisaoRaquete()
  colisaoRaqueteBiblioteca(xRaquete, yRaquete)
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentaRaqueteOponente()
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente)
  incluirPlacar()
  marcaPonto()
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro)
}

function movimentaBolinha() {
  xBolinha += velocidadeXbolinha
  yBolinha += velocidaeYBolinha
}

function VerificaColisaoBordas() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXbolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidaeYBolinha *= -1
  }
}

function mostrarRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura)
}

function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10
  }
}

function verificaColisaoRaquete() {
  if (
    xBolinha - raio < xRaquete + raqueteComprimento &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeXbolinha *= -1
    //raquetada.play()
  }
}

function colisaoRaqueteBiblioteca(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  )

  if (colidiu) {
    velocidadeXbolinha *= -1
  }
}

function movimentaRaqueteOponente() {
  velocidadeYOponente =
    yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30

  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  }
}

function incluirPlacar() {
  stroke(255)
  textAlign(CENTER)
  textSize(20)
  fill(color(255, 140, 0))
  rect(150, 10, 40, 20)
  fill(255)
  text(meusPontos, 170, 26)
  fill(color(255, 140, 0))
  rect(410, 10, 40, 20)
  fill(255)
  text(pontosDoOponente, 430, 26)
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1
    //ponto.play()
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1
    //ponto.play()
  }
}
