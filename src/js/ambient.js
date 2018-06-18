import './utils/raf'
import {
  O2_AMBIENT_INIT,
  O2_AMBIENT_MAIN
} from './utils/const'

const wrapper = document.querySelector('.o2team_ambient_main')
wrapper.addEventListener('click', () => {
  wrapper.style.display = 'none'
})

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
