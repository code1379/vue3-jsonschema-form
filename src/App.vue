<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
  <p>{{ state.firstName }} - {{ lastNameRef }}</p>
  <p>fullNameRef: {{ fullNameRef }}</p>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  computed,
  watchEffect,
  watch
} from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld
  },
  mounted() {
    // setup return 的变量会直接绑定到 this 上
    console.log('mounted', this)
  },
  // 跟 create 一样，只会执行一次
  setup(props, { slots, attrs, emit }) {
    // let name = 'Jokcy'
    const state = reactive({
      firstName: 'Jokcy'
    })
    // => {value: 'Dell'}
    const lastNameRef = ref('Dell')

    setInterval(() => {
      state.firstName += '1'
      lastNameRef.value += '2'
    }, 1000)

    const fullNameRef = computed(() => state.firstName + lastNameRef.value)
    // watchEffect 会立即执行
    // ! 只有里面的依赖项改变才会重新执行
    watchEffect(() => {
      console.log('watchEffect lastNameRefChange', lastNameRef.value)
    })

    // watch(
    //   lastNameRef,
    //   () => {
    //     console.log('watch lastNameRefChange', lastNameRef.value)
    //   },
    //   {
    //     immediate: true,
    //     deep: true
    //   }
    // )

    return {
      state,
      lastNameRef,
      fullNameRef
    }
    // ! 可以直接将 state 返回。注意：不推荐，因为我们不可能只返回一个 reactive 生成的对象
    // return state
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
