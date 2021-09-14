import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import socket from '../socket/index'

interface Line {
  points?: Object
}

export interface State {
  connected: boolean
  nickname: string // 当前用户昵称
  nicknames: Array<string> // 房间用户昵称列表
  holder: string // 游戏主持人
  lines: Array<Object> // 房间的绘图信息 (画了多少根线)
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      connected: false, //连接状态
      nickname: '', // 当前用户昵称
      nicknames: [], // 房间用户昵称列表
      holder: '', // 游戏主持人
      lines: [], // 房间的绘图信息 (画了多少根线)
    }
  },
  mutations: {
    //更新链接状态
    updateConnected(state: State, connected: boolean): void {
      state.connected = connected
    },
    updateNickname(state: State, nickname: string): void {
      state.nickname = nickname || ''
    },
    updateNicknames(state: State, nicknames: string[]): void {
      state.nicknames = nicknames || []
    },
    updateHolder(state: State, holder: string): void {
      state.holder = holder || ''
    },
    updateLines(state: State, lines: Object[]): void {
      state.lines = lines || []
    },
    addToNicknames(state: State, nickname: string): void {
      if (!state.nicknames.includes(nickname)) {
        state.nicknames.push(nickname)
      }
    },
    drawNewLine(state, newLine) {
      state.lines.push(newLine)
    },
    updateNewLine(state, lastLine) {
      const line: Line = state.lines[state.lines.length - 1]
      line.points = lastLine.points
    },
    delFromNicknames(state, nickname) {
      state.nicknames = state.nicknames.filter((item) => item !== nickname)
    },
  },
  actions: {
    //检查用户名是否存在
    checkUserExist(context, nickname: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        socket.emit('check_user_exist', nickname, (isExist: boolean) => {
          resolve(isExist)
        })
      })
    },
    //加入房间
    sendUserEnter(context): void {
      const nickname = localStorage.getItem('nickname')
      socket.emit('enter', nickname)
      context.commit('updateNickname', nickname)
    },
    //开始游戏申请
    sendStartGame(context, imagAnswer: string): void {
      socket.emit('start_game', imagAnswer)
    },
    //结束游戏申请
    sendStopGame(context): void {
      socket.emit('stop_game')
    },

    //绘制新线
    sendDrawNewLine(context, newLine): void {
      socket.emit('new_line', newLine)
    },

    //更新线条
    sendUpdateNewLine(context, lastLine): void {
      socket.emit('update_line', lastLine)
    },

    //发送答案
    sendAnswerGame(context, inputImageName) {
      socket.emit('answer_game', inputImageName)
    },

    //发送离开的用户
    sendUserLeave(context) {
      socket.emit('leave')
      context.commit('updateNickname', '')
      localStorage.removeItem('nickname')
    },
  },
  getters: {
    isGameStarted(state: State): boolean {
      //判断是否有主持人，有主持人表示游戏进行中
      return !!state.holder
    },
    isGameHolder(state: State): boolean {
      return state.holder === state.nickname
    },
  },
})
