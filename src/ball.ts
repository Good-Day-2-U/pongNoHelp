const appDiv = document.getElementById('app') as HTMLDivElement;

export class Ball {



  height: number;
  width: number;
  bgColor : string;
  xPos : number;
  yPos : number;

  up : boolean;
  down : boolean;
  right : boolean;
  left : boolean;

  ballSpeed : number;

  element: HTMLDivElement

  constructor(height: number, width: number, bgColor: string, xPos : number, yPos : number, ballSpeed : number) {
    this.height = height
    this.width = width
    this.bgColor = bgColor
    this.xPos = xPos
    this.yPos = yPos

    this.up = true
    this.down = false
    this.right = false
    this.left = true

    this.ballSpeed = ballSpeed
    this.element = this.renderBall()
  }

  renderBall() {
    const newBall = document.createElement('div')
    newBall.style.height = `${this.height}px`
    newBall.style.width = `${this.width}px`
    newBall.style.backgroundColor = this.bgColor

    newBall.style.position = 'absolute'
    newBall.style.top = `${this.yPos}px`
    newBall.style.left = `${this.xPos}px`

    appDiv.appendChild(newBall)
    return newBall
  }

  ballLogic(speed : number, paddle : any) {

    if(this.xPos >= 780 || this.right && ((this.xPos >= (paddle.xPos - (paddle.width)) && this.xPos <= (paddle.xPos + paddle.width)) && (this.yPos > paddle.yPos) && (this.yPos < paddle.yPos + paddle.height))) {
      console.log(`hit left${this.xPos}`)
      this.right = false;
      this.left = true;
    }

    if((this.xPos <= 0) || this.left && ((this.xPos <= (paddle.xPos + (paddle.width + 2)) && this.xPos >= (paddle.xPos + paddle.width)) && (this.yPos > paddle.yPos) && (this.yPos < paddle.yPos + paddle.height))) {
      console.log(`hit right ${this.xPos}`)
      this.left = false;
      this.right = true;
    }
    
    // if() {
    //   this.left = true;
    //   this.right = false;
    //   console.log(`hit left${paddle.xPos}`)
    // }

    if(this.right) {
      this.xPos += ((speed) / 10)
    }

    if(this.left) {
      this.xPos -= ((speed) / 10)
    }


    if(this.yPos <= 0){        
      this.up = false
      this.down = true
    }
    
    if(this.yPos >= 580){        
      this.up = true
      this.down = false
    }
     
    if(this.down) {
      this.yPos += (speed / 10)
    }

    if(this.up) {
      this.yPos -= (speed / 10)
    }


    this.element.style.top = `${this.yPos}px`
    this.element.style.left = `${this.xPos}px`


    console.log(paddle.element.style.left)
  }



}