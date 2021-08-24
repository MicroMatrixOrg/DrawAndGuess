/*
 * @Author: David
 * @Date: 2021-08-24 13:56:28
 * @LastEditTime: 2021-08-24 17:46:19
 * @LastEditors: David
 * @Description:
 * @FilePath: /client/src/socket/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { store } from '../store/index'
import SocketIO from 'socket.io-client'
import { ElMessageBox, ElNotification } from 'element-plus'

const socket = SocketIO()

socket.on('connect', () => {
  console.log('连接成功')
})
// 处理服务连接
socket.on('connect', () => {
  store.commit('updateConnected', true)
})

// 处理服务失去连接
socket.on('disconnect', () => {
  store.commit('updateConnected', false)
})

export default socket
