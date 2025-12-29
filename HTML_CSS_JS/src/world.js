const World = {
  width: 800,
  height: 600,
  grassY: 460,
  waterY: 480,
  init(w, h) { this.width = w; this.height = h; /* grass fixed for minimal port */ },
  getGrassY() { return this.grassY },
  getWaterY() { return this.waterY },
  update(dt) {},
  drawBackground(ctx) {
    const g = ctx.createLinearGradient(0,0,0,this.height)
    g.addColorStop(0, '#87ceeb'); g.addColorStop(1, '#a0d3ff')
    ctx.fillStyle = g
    ctx.fillRect(0,0,this.width,this.height)
    ctx.fillStyle = '#3c7'
    ctx.fillRect(0, this.grassY, this.width, this.height - this.grassY)
    ctx.fillStyle = '#3aa'
    ctx.fillRect(this.width*0.4, this.grassY+10, this.width*0.6, 90)
  },
  drawForeground(ctx) {},
}

export default World
