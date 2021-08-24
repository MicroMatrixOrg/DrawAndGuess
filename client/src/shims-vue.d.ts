//This `declare module` is called ambient module, which is used to describe modules written in JavaScript.

//declare 声明
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export { component }
}
