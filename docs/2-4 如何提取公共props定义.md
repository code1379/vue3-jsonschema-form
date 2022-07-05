```ts
// !! Readonly
PropsOptions extends Readonly<ComponentPropsOptions>

export declare type ComponentPropsOptions<P = Data> = ComponentObjectPropsOptions<P> | string[];

export declare type ComponentObjectPropsOptions<P = Data> = {
    [K in keyof P]: Prop<P[K]> | null;
};
```

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

- ts 语言的特性会把对象中的 `{required: true}` 认为这个属性是在对象上面是必须的。

```ts
// 如果这样定义， ts 会认为整个对象 PropsType 是必需的参数。
// 在执行的时候，没有人告诉 ts 他是一个 readonly 的对象。
// 它肯定不是，我们不能因为他后面用到了 defineComponent 里面，就认为它是 readonly 的
// 手动告诉 ts 它是 readonly，所以我们要用 as const
const PropsType = {
  msg: String,
  age: {
    type: Number,
    required: true
  }
}
```
