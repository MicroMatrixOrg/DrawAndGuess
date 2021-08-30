/*
 * @Author: David
 * @Date: 2021-08-30 16:35:56
 * @LastEditTime: 2021-08-30 16:39:06
 * @LastEditors: David
 * @Description: 处理proxy报参数错误 报错：...类型“ComponentInternalInstance | null”
 * @FilePath: /client/src/hooks/useCurrentInstance.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
  const { appContext } = getCurrentInstance() as ComponentInternalInstance
  const globalProperties = appContext.config.globalProperties
  return {
    globalProperties,
  }
}
