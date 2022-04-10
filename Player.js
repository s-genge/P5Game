let IDLE = 0;
let JUMP = 1;
//kyle code let RUN = 2;

class Player extends Sprite {
  
  constructor(x, y, width, height, img, dx, dy) {
    super(x, y, width, height, img, dx, dy);
    
    //Physics variables.
    this.g = 0.008 * height;
    this.jumpHeight = 0.17 * height;
    this.startJumpCounter = -1;
    this.jumpCount = this.startJumpCounter;

    //Image variable
    this.playerImage = this.img[0];
    
    //Status variables
    this.collidesRight = false;
    this.collidesLeft = false;
    this.isFalling = true;
    this.isRight = true;
  }
  
  display() {
    //Use push pop to prevent scale from affecting other objects.
    push()
    if (!this.isRight) {
      //Flip image and adjust position accordingly.
      scale(-1, 1);
      image(this.playerImage, -this.pos.x - this.width, this.pos.y, this.width, this.height);
    } else {
      image(this.playerImage, this.pos.x, this.pos.y, this.width, this.height);
    }
    pop()
  }

  update() {
    //Always update y based on dy.
    this.pos.y -= this.velocity.y;
    //If falling change dy by g and change image to falling image.
    if (this.isFalling) {
      this.velocity.y -= this.g
      this.playerImage = this.img[JUMP];
    } 
    //Else set dy to 0, reset jump counter, and set image to idle.
    else {
      this.velocity.y = 0;
      this.jumpCount = this.startJumpCounter;
//kyle code      if (this.isRight != false && this.isRight != true) {
        this.playerImage = this.img[IDLE];
//kyle code      }
    }
  }
  
  moveLeft() {
    this.isRight = false;
    this.pos.x -= this.velocity.x;
//kyle code    this.playerImage = this.img[RUN];
  }

  moveRight() {
    this.isRight = true;
    this.pos.x += this.velocity.x;
//kyle code    this.playerImage = this.img[RUN];
  }

  jump() {
    if (this.jumpCount != 0) {
      this.isFalling = true;
      //Set force in y direction equal to jumpHeight.
      this.velocity.y = this.jumpHeight;
      this.jumpCount--;
    }
  }

  //Work in progress
  isOn(object1, object2) {
    let centerX = object1.getX() + (object1.getWidth() / 2);
    let bottomY = object1.getY() + object1.getHeight();
    return (bottomY >= object2.getY() && 
            bottomY <= object2.getY() + object2.getHeight() && 
            object1.getX() + (0.1 * object1.getWidth()) <= object2.getX() + object2.getWidth() && 
            object1.getX() + object1.getWidth() - (0.1 * object1.getWidth()) >= object2.getX() && 
            object1.getDy() <= 0) 
  }

  resetPhysics() {
    this.isFalling = true;
    this.collidesRight = false;
    this.collidesLeft = false;
  }

  // Getters and Setters
  
  setFalling(bool) {
    this.isFalling = bool;
  }

  getFalling() {
    return this.isFalling;
  }

  setCollidesRight(bool) {
    this.collidesRight = bool;
  }

  getCollidesRight() {
    return this.collidesRight;
  }

  setCollidesLeft(bool) {
    this.collidesLeft = bool;
  }

  getCollidesLeft() {
    return this.collidesLeft;
  }

}