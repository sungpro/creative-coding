export class Sun {
  constructor(radius = 200) {
    this.radius = radius
    this.numPoints = 120;
    this.gap = 1 / this.numPoints;
    this.originPos = [];
    this.pos = [];

    this.fps = 30;
    this.fpsTime = 1000 / this.fps


    for (let i = 0; i < this.numPoints; i++) {
      const pos = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth / 2
    this.y = this.stageHeight / 2
  }

  draw(ctx, t) {
    if (!this.time) this.time = t;
    
    const now = t - this.time;
    
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }

    ctx.fillStyle = '#ffbf00'
    ctx.beginPath();

    let pos = this.pos[0];
    ctx.moveTo(pos.x + this.x, pos.y + this.y);

    for (let i = 1; i < this.numPoints; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y)
    }

    ctx.fill()
  }

  getCirclePoint(radius, t) {
    const theta = Math.PI * 2 * t;

    return {
      x: Math.cos(theta) * radius,
      y: Math.sin(theta) * radius
    }
  }

  updatePoints() {
    for (let i = 1; i < this.numPoints; i++) {
      const pos = this.originPos[i];
      this.pos[i] = {
        x: pos.x + this.randInt(10),
        y: pos.y + this.randInt(10)
      }
    }
  }

  randInt = (max) => Math.random() * max;
}

window.onload = () => new App();