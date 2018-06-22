/*
 * 控制面板
 */

import dat from 'dat.gui'
import {
  O2_AMBIENT_MAIN,
  // O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG
} from './js/utils/const'
import { getParameterByName } from './js/utils/util'

/* eslint-disable no-unused-vars */
const isLoop = getParameterByName('loop') // 非循环动画是否循环播放
const isShowController = getParameterByName('controller') // 是否展示控制面板参数
const isAmbientPlat = getParameterByName('platform') === '1' // 是否平台环境

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

  class Control {
    constructor () {
      this.config = window[O2_AMBIENT_CONFIG] || {}
      this.otherConfig = new OtherConfig()
      this.initBaseGUI()
      this.initTextureGUI()
      isShowController && Control.setBackgroundColor(this.otherConfig.backgroundColor)
      if (isAmbientPlat) {
        // 平台环境，获取 iframe dom
        this.transferMonPC = document.getElementById('transferMon_pc')
        this.transferMonM = document.getElementById('transferMon_m')
      } else {
        // demo 环境，监听 postmessage
        this.bindMsg()
      }
    }

    // 监听 postmessage
    bindMsg () {
      window.addEventListener('message', (msg) => {
        if (msg.data.type !== 'reset') return
        window[O2_AMBIENT_CONFIG] = Object.assign(window[O2_AMBIENT_CONFIG], msg.data.data)
        this.resetCanvas()
      })
    }

    // 初始化控制板-基础部分
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

    // 初始化控制板-输入框部分
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

    // 设置控制板层级
    setGUIzIndex (zIndex) {
      this.gui.domElement.parentElement.style.zIndex = zIndex
    }

    // 设置页面背景色
    static setBackgroundColor (color) {
      document.body.style.backgroundColor = color
    }

    // 重置画布
    resetCanvas () {
      isAmbientPlat && this.transferProcess()
      window[O2_AMBIENT_MAIN] && window[O2_AMBIENT_MAIN].reset && typeof window[O2_AMBIENT_MAIN].reset === 'function' && window[O2_AMBIENT_MAIN].reset()
    }

    // 传送数据
    transMsg (dom) {
      let transWin = dom.contentWindow
      transWin.postMessage({type: 'reset', data: window[O2_AMBIENT_CONFIG]}, `${window.location.protocol}${dom.getAttribute('src')}`)
    }

    // iframe dom
    transferProcess () {
      if (!this.transferMonPC) {
        this.transferMonPC = document.getElementById('transferMon_pc')
      }
      if (!this.transferMonM) {
        this.transferMonM = document.getElementById('transferMon_m')
      }

      this.transferMonPC && this.transMsg(this.transferMonPC)
      this.transferMonM && this.transMsg(this.transferMonM)
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
  if (/* !window[O2_AMBIENT_INIT] && */!window[O2_AMBIENT_CONFIG]) return
  clearInterval(csi)
  controlInit()
}, 1000)