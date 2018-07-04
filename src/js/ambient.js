import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_CONFIG
} from './utils/const'

// 判断是否可点，被点中则隐藏
const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

// 初始化函数
function initAmbient () {
  // let xxx = new XXX()
  // 主函数暴露
  // window[O2_AMBIENT_MAIN] = xxx
}

// 初始化函数
window[O2_AMBIENT_INIT] = initAmbient

try {
  // 保证配置读取顺序
  let csi = setInterval(() => {
    if (!window[O2_AMBIENT_CONFIG]) return
    clearInterval(csi)
    initAmbient()
  }, 1000)
} catch (e) {
  console.log(e) 
}
