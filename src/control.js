/*
 * 控制面板
 */

import dat from 'dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG,
  O2_AMBIENT_INIT
} from './js/utils/const'
import { getParameterByName } from './js/utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')
const isShowController = getParameterByName('controller')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.message = '挂件名'
      this.backgroundColor = '#bddaf7'
      this.play = () => {
        window[O2_AMBIENT_MAIN] && window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  class Control {
    constructor () {
      this.config = window[O2_AMBIENT_CONFIG] || {}
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.initTextureGUI()
      isShowController && Control.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.add(otherConfig, 'message').name('配置面板')
      gui.add(otherConfig, 'play').name('播放 / 暂停')
      config.particleNumber && gui.add(config, 'particleNumber', 3, 100, 1).name('粒子数量').onFinishChange(val => {
        // window[O2_AMBIENT_INIT]()
        this.resetCanvas()
      })
      isShowController && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        Control.setBackgroundColor(val)
      })
      this.gui = gui
      this.setGUIzIndex(2)
    }

    initTextureGUI () {
      const gui = this.gui
      const textures = this.config.textures
      const texturesFolder = gui.addFolder('纹理')
      textures && Object.keys(textures).forEach((key, idx) => {
        const textureController = texturesFolder.add(textures, key).name(`纹理${idx + 1}`)
        textureController.onFinishChange(val => {
          this.resetCanvas()
        })
      })
      texturesFolder.open()

      this.texturesFolder = texturesFolder
    }

    setGUIzIndex (zIndex) {
      this.gui.domElement.parentElement.style.zIndex = zIndex
    }

    static setBackgroundColor (color) {
      document.body.style.backgroundColor = color
    }

    resetCanvas () {
      window[O2_AMBIENT_MAIN] && window[O2_AMBIENT_MAIN].reset && typeof window[O2_AMBIENT_MAIN].reset === 'function' && window[O2_AMBIENT_MAIN].reset()
    }
  }

  /* eslint-disable no-new */
  new Control()

  if (!isShowController) {
    let style = document.createElement('style')
    style.innerHTML = '.dg.ac {visibility: hidden;}'
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

let csi = setInterval(() => {
  if (!window[O2_AMBIENT_INIT] && !window[O2_AMBIENT_CONFIG]) return
  clearInterval(csi)
  controlInit()
}, 1000)