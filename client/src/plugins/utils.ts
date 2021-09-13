/*
 * @Author: David
 * @Date: 2021-09-13 16:43:48
 * @LastEditTime: 2021-09-13 17:22:28
 * @LastEditors: David
 * @Description:工具类
 * @FilePath: /client/src/plugins/utils.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
//防抖函数
let debounce = (
  fn: Function,
  wait: number = 50,
  immediate: boolean = false
) => {
  let timer: any, context: any, args: any
  const later = () =>
    setTimeout(() => {
      timer = null
      if (!immediate) {
        fn.apply(context, args)
        context = args = null
      }
    }, wait)

  return (...params: any[]): any => {
    if (!timer) {
      timer = later()
      if (immediate) {
        fn.apply(this, args)
      } else {
        context = this
        args = params
      }
    } else {
      clearTimeout(timer)
      timer = later()
    }
  }
}

const utils = {
  debounce,
}

export default utils
