# 2-8 使用 jsx 开发 vue3 组件

## 好处

1. 在 jsx 中用到的变量，都是可以立即提醒的。
2. 组件 props 没有传递提醒

   - 比如组件 HelloWorld 必须传递 age，当我们没有传递时会报错。!! 在控制台报错。

   ```tsx
     <HelloWorld/>

   TS2322: Type '{}' is not assignable to type 'IntrinsicAttributes & Partial<{}> & Omit<Readonly<ExtractPropTypes<{ readonly msg: StringConstructor; readonly age: { readonly type: NumberConstructor; readonly required: true; }; }>> & VNodeProps & AllowedComponentProps & ComponentCustomProps, never>'.
   Property 'age' is missing in type '{}' but required in type 'Omit<Readonly<ExtractPropTypes<{ readonly msg: StringConstructor; readonly age: { readonly type: NumberConstructor; readonly required: true; }; }>> & VNodeProps & AllowedComponentProps & ComponentCustomProps, never>'.
   ```

   - 而在原来的 SFC 里控制台不会报错。只会在没有传递 age 的时候，鼠标移动上去显示错误

   ```vue
   <template>
     <!-- 没有传递 vue，会报错，但是控制台不会报错 -->
     <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
   </template>
   ```

3. setup 语法糖 jsx 不会对 props 的 required 进行验证
