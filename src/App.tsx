import { defineComponent, render, h, reactive, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import BasicSetup from '@/components/BasicSetup.vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('./assets/logo.png')

function renderHelloWorld(num: number) {
  return <HelloWorld age={num} />
}

const App = defineComponent({
  // render() {
  //   return '123'
  // }
  setup() {
    // setup 返回一个函数，相当于 render
    const state = reactive({
      name: 'Jocky'
    })
    const numRef = ref(0)
    setInterval(() => {
      state.name += '1'
      numRef.value += 1
    }, 1000)

    // ! 错误。只在第一次执行。
    // const number = numRef.value
    // 闭包
    // 带来的好处，变量引用是非常明确的。 ts 可以给我们提供一个变量引用的提醒

    // * 当 value 变化，会引起 return 的函数重新执行
    return () => {
      // * 正确
      const number = numRef.value
      // https://staging-cn.vuejs.org/guide/extras/render-function.html#jsx-tsx
      // 新版本的 vue 中，已经内置了 jsx 语法，不需要安装
      // create-vue 和 Vue CLI 都有预置的 JSX 语法支持。如果你想手动配置 JSX，请参阅 @vue/babel-plugin-jsx 文档获取更多细节。
      return (
        <div id="app">
          <img src={logo} alt="logo" />
          <p>name: {state.name}</p>
          <p>number: {number}</p>
          {/* <HelloWorld age={12} /> */}
          {renderHelloWorld(123)}
          <BasicSetup />
        </div>
      )
    }
  }
})

export default App
