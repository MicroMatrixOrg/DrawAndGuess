/*
 * @Author: David
 * @Date: 2021-08-24 13:56:28
 * @LastEditTime: 2021-08-30 16:37:48
 * @LastEditors: David
 * @Description:
 * @FilePath: /client/src/socket/index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { store } from '../store/index'
import SocketIO from 'socket.io-client'
import { ElMessageBox, ElNotification } from 'element-plus'

const socket = SocketIO()

// socket.on('connect', () => {
//   console.log('连接成功')
// })

//自己进入房间获取房间信息
socket.on('room_info', ({ nicknames, holder, lines }) => {
  store.commit('updateNicknames', nicknames)
  store.commit('updateHolder', holder)
  store.commit('updateLines', lines)
})

// 别人进入房间, 监听user_enter事件, 获取进入房间的用户信息
socket.on('user_enter', (nickname) => {
  store.commit('addToNicknames', nickname)
})

// 处理服务连接
socket.on('connect', () => {
  store.commit('updateConnected', true)
})

// 处理服务失去连接
socket.on('disconnect', () => {
  store.commit('updateConnected', false)
})

socket.on('game_started', (holder) => {
  store.commit('updateHolder', holder)
  ElNotification({
    title: '成功',
    message: `${holder}作为主持人`,
    type: 'success',
  })
})

//处理游戏不能重复开始
socket.on('already_study', (holder) => {
  store.commit('updateHolder', holder)
  ElMessageBox.alert('当前已有游戏在进行中，主持人是：' + holder)
})

//处理终止游戏
socket.on('game_stop', () => {
  //1、清楚相关数据
  store.commit('updateHolder', '')
  store.commit('updateLines', [])

  //2、弹出对话框
  ElNotification({
    title: '游戏终止',
    message: `主持人关闭了游戏`,
    type: 'warning',
  })
})

//监听新线的绘制
socket.on('starting_line', (newLine) => {
  store.commit('drawNewLine', newLine)
})

// 监听线的更新
socket.on('updating_line', (lastLine) => {
  store.commit('updateNewLine', lastLine)
})

socket.on('game_answered', ({ alreadyDone, success, nickname, answer }) => {
  if (alreadyDone) {
    ElMessageBox.alert('当前游戏答案已经被猜中，您不能继续猜了！')
    return
  }
  if (!success) {
    ElNotification({
      title: '答案错误',
      message: `玩家 ${nickname} 猜的答案不对：${answer}`,
      type: 'warning',
    })

    return
  }

  ElMessageBox.alert(`玩家 ${nickname} 猜中正确的答案：${answer}`, {
    title: '恭喜',
    type: 'success',
  })
})

socket.on('user_leave', (nickname) => {
  store.commit('delFromNicknames', nickname)

  if (nickname === store.state.holder) {
    store.commit('updateHolder', '')
    store.commit('updateLines', [])
    ElNotification({
      title: '答案错误',
      message: `主持人离开了游戏`,
      type: 'warning',
    })
  }
})

export default socket
