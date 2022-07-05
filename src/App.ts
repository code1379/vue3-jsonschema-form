import { defineComponent, render, h, reactive, ref } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logo = require('./assets/logo.png')

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
      return h(
        'div',
        {
          id: 'app'
        },
        [
          h('img', { alt: 'logo img', src: logo }),
          h('p', state.name),
          h('p', numRef.value + '-' + number)
        ]
      )
    }
  }
})

export default App
