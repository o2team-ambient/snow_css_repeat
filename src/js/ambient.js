import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './utils/const'

function initAmbient () {
  // let xxx = new XXX()
  // 主函数暴露
  // window[O2_AMBIENT_MAIN] = xxx
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient

try {
  initAmbient()
} catch (e) {
  console.log(e) 
}
