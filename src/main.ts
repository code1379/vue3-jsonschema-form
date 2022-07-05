import { createApp, defineComponent, h } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
// ! h 函数中使用图片需要引入
// 1. 通过 required 但是需要添加 eslint-disable
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const logo = require('./assets/logo.png')
// 2. 通过 images.d.ts 来定义文件 module
// 参考 https://segmentfault.com/a/1190000041612989?utm_source=sf-similar-article
// 1链接的2. https://www.cnblogs.com/chen-cong/p/10445635.html?ivk_sa=1024320u
import logo from './assets/logo.png'
// import App from './App.vue'
/**
 * <div id="app">
 *  <img alt="Vue logo" src="./assets/logo.png" />
 *  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
 * </div>
 */
const App = defineComponent({
  render() {
    return h('div', { id: 'app' }, [
      h('img', { alt: 'Vue logo', src: logo }),
      h(HelloWorld, {
        msg: 'Welcome to Your Vue.js + TypeScript App + render by h',
        age: 18
      })
    ])
  }
})

createApp(App).mount('#app')
