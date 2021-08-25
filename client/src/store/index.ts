import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import socket from '../socket/index'

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
      context.commit('uo')
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
