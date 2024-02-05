import * as PIXI from 'pixi.js'
import './style.css'

const app = new PIXI.Application({
  resizeTo: window,
  resolution: window.devicePixelRatio,
  autoDensity: true,
  backgroundColor: 0x000022
})

document.body.append(app.view as HTMLCanvasElement)

const width = app.screen.width
const height = app.screen.height

class Snow extends PIXI.Graphics {
  #x: number
  #y: number
  #z: number
  #culcbase () {
    super.x = this.#x / this.#z
    super.y = this.#y / this.#z
    const scale = 1 / this.#z
    this.scale.set(scale, scale)

    this.rotation += Math.random() / 10
  }
  constructor (x: number, y: number, z: number) {
    super()

    this.#x = x
    this.#y = y
    this.#z = z

    this.lineStyle(1, 0xffffff)
      .moveTo(Math.cos(0 * Math.PI / 180) * -4, Math.sin(0 * Math.PI / 180) * -4)
      .lineTo(Math.cos(0 * Math.PI / 180) * 4, Math.sin(0 * Math.PI / 180) * 4)
      .moveTo(Math.cos(60 * Math.PI / 180) * -4, Math.sin(60 * Math.PI / 180) * -4)
      .lineTo(Math.cos(60 * Math.PI / 180) * 4, Math.sin(60 * Math.PI / 180) * 4)
      .moveTo(Math.cos(120 * Math.PI / 180) * -4, Math.sin(120 * Math.PI / 180) * -4)
      .lineTo(Math.cos(120 * Math.PI / 180) * 4, Math.sin(120 * Math.PI / 180) * 4)
    
    this.#culcbase()
  }
  set x (v: number) {
    this.#x = v
    this.#culcbase()
  }
  get x () {
    return this.#x
  }
  set y (v: number) {
    this.#y = v
    this.#culcbase()
  }
  get y () {
    return this.#y
  }
  set z (v: number) {
    this.#z = v
    this.#culcbase()
  }
  get z () {
    return this.#z
  }

  getBase () {
    return {
      x: super.x,
      y: super.y
    }
  }
}

const snows = new PIXI.Container()
snows.x = width / 2
snows.y = height / 2

app.stage.addChild(snows)

const addSnow = () => {
  const baseX = Math.random() * width - width / 2
  const baseY = height / -2
  const z = Math.random() * 10 + 1
  snows.addChild(
    new Snow(baseX * z, baseY * z, z)
  )
}
addSnow()
const step = () => {
  for (let i = 0; i !== 10; i++) {
    addSnow()
  }

  for (const snow of snows.children as Snow[]) {
    snow.y += 10
    if (snow.y > 400) {
      snow.destroy()
    }
  }
  requestAnimationFrame(step)
}
step()
