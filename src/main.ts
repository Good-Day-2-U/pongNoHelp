import { Ball } from "./ball.ts"

const appDiv = document.getElementById('app') as HTMLDivElement;
appDiv.style.position = 'relative';

const width = 800;
const height = 600;

appDiv.style.backgroundColor = 'lightgrey';
appDiv.style.width = `${width}px`;
appDiv.style.height = `${height}px`;

let up = false
let down = false

class Paddle {
  xPos: number;
  yPos: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  element : HTMLDivElement;
  reqId : any;
  


  constructor(xPos: number, yPos: number, width: number, height: number, color: string, speed: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;
    this.color = color;
    this.speed = speed;
    this.element = this.renderPaddle();
    this.reqId = requestAnimationFrame
  }

  renderPaddle() {
    document.createElement('div');
    const paddle = document.createElement('div') as HTMLDivElement;
    paddle.style.position = 'absolute';
    paddle.style.left = `${this.xPos}px`;
    paddle.style.top = `${this.yPos}px`;
    paddle.style.width = `${this.width}px`;
    paddle.style.height = `${this.height}px`;
    paddle.style.backgroundColor = this.color;
    appDiv.appendChild(paddle);
    return paddle;
  }

  startPaddle(Event : KeyboardEvent){  
    if(Event.key === 'w') {
      down = false
      up = true
    }
    if(Event.key === 's') {
      up = false
      down = true
    }
  }

  movePaddle2() {
    if(true){    
      const move = () => {
        if(up && this.yPos > height - height){
          this.yPos -= this.speed;
          console.log(this.element.style.top)
          console.log('Up')
        }
        if(down && this.yPos < height - this.height){
          this.yPos += this.speed;
          console.log(this.element.style.top)
          console.log('Down')
        }
        this.element.style.top = `${this.yPos}px`
        this.reqId = requestAnimationFrame(move.bind(this))
      }
      cancelAnimationFrame(this.reqId)
      move()
    }
  }
  
  stopPaddle(Event : KeyboardEvent) {
    if(Event.key === 'w' || Event.key === 's') {    
      console.log("Paddle Stopped")
      up = false
      down = false
    }
  }

}

const paddle = new Paddle(100, 250, 20, 100, 'black', 10);

// const paddle2 = new Paddle(770, 250, 20, 100, 'black', 1);


const paddleLogic = (Event : KeyboardEvent) => {
  paddle.startPaddle(Event)
}

const stopPaddle = (Event : KeyboardEvent) => {
  paddle.stopPaddle(Event)
}

window.addEventListener('keydown', paddleLogic)
window.addEventListener('keyup', stopPaddle)


paddle.movePaddle2()




const ball = new Ball(20, 20, 'red', 400, 300, 1)

const ballLoop = function() {
  ball.ballLogic(30, paddle)
  requestAnimationFrame(ballLoop)
}
ballLoop()





// const speedGun = () => {
//   console.log(paddle.speed)
//   requestAnimationFrame(speedGun)
// }
// speedGun()