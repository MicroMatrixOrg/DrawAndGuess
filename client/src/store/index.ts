import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import socket from '../socket/index'

export interface State {
  connected: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state() {
    return {
      connected: false, //连接状态
    }
  },
  mutations: {
    updateConnected(state, connected) {
      state.connected = connected
    },
  },
  actions: {
    //检查用户名是否存在
    checkUserExist(context, nickname) {
      return new Promise((resolve, reject) => {
        socket.emit('check_user_exist', nickname, (isExist: boolean) => {
          resolve(isExist)
        })
      })
    },
  },
  getters: {},
})
