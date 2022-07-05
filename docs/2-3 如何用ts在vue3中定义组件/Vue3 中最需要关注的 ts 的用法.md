# Vue3 中最需要关注的 ts 的用法

## 如何定义 Props 的类型 \*重点关注

- 可以让我们确定 props 参数的类型，而不会传错，让我们可以正确的使用这个组件

## Component 接口（如何定义组件）

- 通过 defineComponent 函数，去定义
- VSCode Ctrl 点击，会跳转到 runtime-core.d.ts

```ts
defineComponent({
  // PropsOrPropOptions
  props: {},
  // RawBindings => setup的返回值
  setup() {
    return {}
  },
  // D
  data() {
    return {}
  },
  // C ComputedOptions
  computed: {
    xx() {}
  },
  methods: {}
})
```

### 手动声明 defineComponent 的类型

```ts
type myComponentDefine = DefineComponent<
  { a: string },
  { name: string },
  {},
  {
    count: () => number
  }
>
```

### 返回类型

- ComponentPublicInstance

```ts
export type ComponentPublicInstance<
  P = {}, // props type extracted from props option
  B = {}, // raw bindings returned from setup()
  D = {}, // return from data()
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  E extends EmitsOptions = {},
  PublicProps = P,
  Defaults = {},
  MakeDefaultsOptional extends boolean = false,
  Options = ComponentOptionsBase<any, any, any, any, any, any, any, any, any>
> = {
  $: ComponentInternalInstance
  $data: D
  $props: MakeDefaultsOptional extends true
    ? Partial<Defaults> & Omit<P & PublicProps, keyof Defaults>
    : P & PublicProps
  $attrs: Data
  $refs: Data
  $slots: Slots
  $root: ComponentPublicInstance | null
  $parent: ComponentPublicInstance | null
  $emit: EmitFn<E>
  $el: any
  $options: Options & MergedComponentOptionsOverride
  $forceUpdate: () => void
  $nextTick: typeof nextTick
  $watch(
    source: string | Function,
    cb: Function,
    options?: WatchOptions
  ): WatchStopHandle
} & P &
  ShallowUnwrapRef<B> &
  UnwrapNestedRefs<D> &
  ExtractComputedReturns<C> &
  M &
  ComponentCustomProperties
```

## 如果使用 ts 的话，基本不会用到前三种 defineComponent

```ts
// overload 4: object format with object props declaration
// see `ExtractPropTypes` in ./componentProps.ts
export function defineComponent<
  // the Readonly constraint allows TS to treat the type of { required: true }
  // as constant instead of boolean.
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string
>(
  options: ComponentOptionsWithObjectProps<
    PropsOptions,
    RawBindings,
    D,
    C,
    M,
    Mixin,
    Extends,
    E,
    EE
  >
): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>
```

## vue3 ts 最大的区别在于 props

```ts
import { defineComponent, PropType } from 'vue'

interface IConfig {
  name: string
}

export default defineComponent({
  props: {
    age: {
      // ! 指定为 ts 的类型
      type: Number as PropType<number>
    },
    config {
      // type: Object
      type: Object as PropType<IConfig>
    }
  },
  mounted() {
    // 因为没有使用 required，会有 undefined（如果没有required 我们需要使用 this.config?.name）
    // 当 type 为 Object 的时候，获得的 config 类型是 Record<string | any> | undefined
    console.log(this.config)
  }
})
```
