let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")  // renderiza 2D
let box = 32
let snake = []

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direcao = "right"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
    context.fillStyle = "lightgreen" // cor de fundo | contexto
    context.fillRect(0, 0, 16 * box, 16 * box)  // desenha nosso retangulo trabalha com 4 parametros x e y altura e largura
}


function criarCobrinha() {
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function desenhaComida() {
    context.fillStyle = 'red'
    context.fillRect(food.x, food.y, box, box)
}

document.addEventListener("keydown", update)


function update(evento) {
    if(evento.keyCode == 37 && direcao != "right") direcao = "left"
    if(evento.keyCode == 38 && direcao != "down") direcao = "up" 
    if(evento.keyCode == 39 && direcao != "left") direcao = "right"
    if(evento.keyCode == 40 && direcao != "up") direcao = "down"

}



function iniciarJogo() {

    if(snake[0].x > 15 * box && direcao == "right") snake[0].x = 0
    if(snake[0].x < 0 && direcao == "left") snake[0].x = 16 * box
    if(snake[0].y > 15 * box && direcao == "down") snake[0].y = 0
    if(snake[0].y < 0 && direcao == "up") snake[0].y = 16 * box

    for(i = 1; i < snake.length; i++) {
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert("Game Over")
        }
    }

    criarBG()
    criarCobrinha()
    desenhaComida()

    let snakeX = snake[0].x
    let snakeY = snake[0].y


    if(direcao == "right") snakeX += box
    if(direcao == "left") snakeX -= box
    if(direcao == "up") snakeY -= box
    if(direcao == "down") snakeY += box

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop()
    }else {
       food.x = Math.floor(Math.random() * 15 + 1) * box
       food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    // snake.pop()

    let novaCabeca = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(novaCabeca)
}


let jogo = setInterval(iniciarJogo, 100)



