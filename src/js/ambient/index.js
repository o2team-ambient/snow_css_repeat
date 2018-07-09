import {
  O2_AMBIENT_CLASSNAME
} from '../utils/const'

class Snow {
  constructor() {
    this.reset()
  }

  initDOM() {
    const container = document.createElement('div')
    const className = this.className
    container.className = className
    container.innerHTML =
      `<div class="${className}_item ${className}_item--near"></div>` +
      `<div class="${className}_item ${className}_item--near ${className}_item--alt"></div>` +
      `<div class="${className}_item ${className}_item--mid"></div>` +
      `<div class="${className}_item ${className}_item--mid ${className}_item--alt"></div>` +
      `<div class="${className}_item ${className}_item--far"></div>` +
      `<div class="${className}_item ${className}_item--far ${className}_item--alt"></div>`
    this.parent.appendChild(container)
    this.container = container
  }

  reset() {
    this.parent = document.querySelector('.o2team_ambient_main')
    this.className = O2_AMBIENT_CLASSNAME
    this.destory()
    this.initDOM()
  }

  destory() {
    if (this.container && this.parent) {
      this.parent.removeChild(this.container)
    }
  }
}

export default Snow
