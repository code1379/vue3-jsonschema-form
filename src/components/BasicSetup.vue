<template>
  <div>Basic Setup</div>
  <div>code: {{ code }}</div>
  <div>displayStuId: {{ displayStuId }}</div>
</template>

<script lang="ts">
const propsType = {
  code: {
    type: Number,
    required: true
  }
} as const
</script>

<script setup lang="ts">
import { computed, defineProps } from 'vue'

// const props = defineProps<{
//   code: number
// }>()
// ! 这接这样定义 propsType，在 defineProps 中直接使用的话，会报错
// `defineProps` are referencing locally declared variables.eslintvue/valid-define-props
// https://eslint.vuejs.org/rules/valid-define-props.html
// const propsType = {
//   code: {
//     type: Number,
//     required: true
//   }
// } as const

const props = defineProps(propsType)
const displayStuId = computed(() => `stuid: ${props.code}`)
</script>

<style scoped></style>
