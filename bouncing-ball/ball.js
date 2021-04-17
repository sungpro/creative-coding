export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.dx = speed;
    this.dy = speed;

    const diameter = this.radius * 2;
    this.x = diameter + Math.random() * stageWidth - diameter;
    this.y = diameter + Math.random() * stageHeight - diameter;

    this.fps = 60;
    this.fpsTime = 1000 / this.fps;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth / 2;
    this.y = this.stageHeight / 2;
  }

  draw(ctx, stageWidth, stageHeight, block, t) {
    if (!this.time) this.time = t;
    
    const now = t - this.time;
    
    if (now > this.fpsTime) {
      this.time = t;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.bounceWindow(stageWidth, stageHeight);

    this.bounceBlock(block);

    ctx.fillStyle = '#ffbf00';
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.dx *= -1;
      this.x += this.dx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.dy *= -1;
      this.y += this.dy;
    }
  }

  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x <= maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);

      const axisMinX = Math.min(x1, x2);
      const axisMinY = Math.min(y1, y2);
      const axisMin = Math.min(axisMinX, axisMinY);

      if (axisMin == axisMinX) {
        this.dx *= -1;
        this.x += this.dx;
      } else if (axisMin == axisMinY) {
        this.dy *= -1;
        this.y += this.dy;
      }
    }
  }

}

window.onload = () => new App();