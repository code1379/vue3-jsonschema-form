<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>age: {{ age }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// * 有可能很多组件都通用 propsType，所以我们可以提取到外面
const propsType = {
  msg: String,
  // ! 当使用对象定义的时候（或者 age: Number），在 mounted 直接获取的类型是 number | undefined
  // ! 即使添加了 required: true 获取到类型也是 number | undefined
  // 为什么呢？ 因为 defineComponent 的 props 定义是 PropsOptions extends Readonly<ComponentPropsOptions>
  // 而 readonly 会读取到里面的 required: true，会把整个对象认为是 必需的
  // ts 语法中 as const 可以将对象转换为 readonly
  /**
   * export type ComponentPropsOptiosn
   */
  age: {
    type: Number,
    required: true
  }
} as const

export default defineComponent({
  name: 'HelloWorld',
  props: propsType,
  mounted() {
    this.age
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
