/*
 * 控制面板
 */

import dat from 'dat.gui'
import {
  O2_AMBIENT_MAIN,
  O2_AMBIENT_CONFIG
} from './js/utils/const'
import Controller from './js/utils/controller'
import { getParameterByName } from './js/utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop')

let controlInit = () => {
  // 非必要配置字段（仅用于展示，如背景颜色、启动/暂停）
  class OtherConfig {
    constructor () {
      this.message = '挂件名'
      this.backgroundColor = '#bddaf7'
      this.play = () => {
        if (!window[O2_AMBIENT_MAIN] || !window[O2_AMBIENT_MAIN].toggle || typeof window[O2_AMBIENT_MAIN].toggle !== 'function') return
        window[O2_AMBIENT_MAIN].toggle()
      }
    }
  }

  class Control extends Controller {
    constructor () {
      super()
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.initTextureGUI()
      this.isShowController && !this.isAmbientPlat && this.setBackgroundColor(this.otherConfig.backgroundColor)
    }

    initBaseGUI () {
      // demo code
      const config = this.config
      const otherConfig = this.otherConfig
      const gui = new dat.GUI()
      gui.add(otherConfig, 'message').name('配置面板')
      gui.add(otherConfig, 'play').name('播放 / 暂停')
      config.particleNumber && gui.add(config, 'particleNumber', 3, 100, 1).name('粒子数量').onFinishChange(val => {
        // window[O2_AMBIENT_INIT]()
        this.resetCanvas()
      })
      this.isShowController && !this.isAmbientPlat && gui.addColor(otherConfig, 'backgroundColor').name('背景色(仅演示)').onFinishChange(val => {
        this.setBackgroundColor(val)
      })
      this.gui = gui
      // 设置控制面板层级
      this.setGUIzIndex(2)
    }

    initTextureGUI () {
      // demo code
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
  }

  /* eslint-disable no-new */
  new Control()

  if (!isShowController && !isAmbientPlat) {
    let style = document.createElement('style')
    style.innerHTML = '.dg.ac {visibility: hidden;}'
    document.getElementsByTagName('head')[0].appendChild(style)
  }
}

let csi = setInterval(() => {
  if (/* !window[O2_AMBIENT_INIT] && */!window[O2_AMBIENT_CONFIG]) return
  clearInterval(csi)
  controlInit()
}, 1000)