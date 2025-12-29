import { Assets } from './assets.js'

const Player = {
  x: 0,
  y: 0,
  w: 16,
  h: 32,
  speed: 150,
  init(startX, startY) {
    this.x = startX || 400
    this.y = startY || 300
  },
  update(dt, keys) {
    let dx = 0, dy = 0
    if (keys['w'] || keys['ArrowUp']) dy -= 1
    if (keys['s'] || keys['ArrowDown']) dy += 1
    if (keys['a'] || keys['ArrowLeft']) dx -= 1
    if (keys['d'] || keys['ArrowRight']) dx += 1
    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707 }
    this.x += dx * this.speed * dt
    this.y += dy * this.speed * dt
    this.x = Math.max(this.w/2, Math.min(800 - this.w/2, this.x))
    this.y = Math.max(this.h/2, Math.min(600 - this.h/2, this.y))
  },
  draw(ctx) {
    const img = Assets.getImage('player')
    if (img) ctx.drawImage(img, this.x - this.w/2, this.y - this.h/2, this.w*2, this.h*2)
    else {
      ctx.fillStyle = '#2e9'
      ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
  }
}

export default Player
