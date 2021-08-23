/*
 * @Author: David
 * @Date: 2021-08-23 15:09:46
 * @LastEditTime: 2021-08-23 17:34:51
 * @LastEditors: David
 * @Description: 主要接口
 * @FilePath: /service/src/websocket.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
const io = require('socket.io');

module.exports = httpServer => {
  const server = io(httpServer)
  const user2socket = {};
  const socket2user = {};

  let currentGame = null;

  //连接状态下
  server.on('connection', socket => {
    //【接口】检查用户昵称是否在房间中已存在
    socket.on('check_user_exist', (nickname, callback) => {
      callback(!!user2socket[nickname]);
    })

    //【接口】用户进入游戏
    socket.on('enter', (nickname, callback) => {
      const sid = socket.id;
      //添加用户信息
      user2socket[nickname] = sid;
      socket2user[sid] = nickname;

      //发送当前用户列表给当前用户
      socket.emit('room_info', {
        nickname: Object.keys(user2socket),
        holder: currentGame ? currentGame.holder : '',
        lines: currentGame ? currentGame.lines : []
      })

      //发送新进用户给其他用户
      socket.broadcast.emit('user_enter', nickname)
    })

    socket.leave.emit('leave', () => {
      const sid = socket.id;
      const nickname = socket2user[sid];

      //移除用户信息
      delete user2socket[nickname];
      delete socket2user[sid];

      //如果当前离开的是游戏主持人
      if (currentGame && currentGame.holder == nickname) {
        currentGame = null;
      }

      //发送离开的用户信息给其他用户 (广播消息)
      socket.broadcast.emit('user_leave', nickname);
    })

    //申请开始游戏
    socket.on('start_game', (finalAnswer) => {
      if (currentGame) {
        //游戏厨艺开始阶段
        socket.emit('already_started', currentGame.holder);
        retrun;
      }

      //游戏可以开始;设置答案，主持人
      currentGame = {
        success: false,
        holder: socket2user[socket.id],
        finalAnswer,
        lines: []
      }

      server.of('/').emit('game_started', currentGame.holder)
    })

    //申请终止游戏
    socket.on('stop_game', () => {
      const nickname = socket2user[socket.id];

      //只有主持人才可以终止游戏
      if (currentGame && currentGame.holder == nickname) {
        currentGame = null;
        server.of('/').emit("game_stoped")
      }
    })

    //用户提交答案，校验
    socket.on('answer_game', answer => {
      //游戏为开始，不能接受答案
      if (!currentGame) retrun;

      if (currentGame.success) {
        socket.emit('game_answered', {
          alreadyDone: true
        })
      } else {
        const success = currentGame.finalAnswer == answer;
        if (success) {
          currentGame.success = true;
        }
        server.of('/').emit('game_answered', {
          alreadyDone: false,
          success,
          nickname: socket2user[socket.id],
          answer
        })
      }
    })

    //用户绘图信息
    socket.on('new_line', line => {
      if (currentGame && currentGame.lines) {
        currentGame.lines[currentGame.lines.length - 1] = line;
        socket.broadcast.emit("updating_line", line)
      }
    })
  })

  //客户端断开
  server.on('disconnect', () => {
    const sid = socket.id;
    const nickname = socket2user[sid];

    delete user2socket[nickname];
    delete socket2user[sid];

    // 如果当前离开的是游戏主持人
    if (currentGame && nickname === currentGame.holder) {
      currentGame = null
    }

    // 发送离开的用户信息给其他用户（广播一下）
    socket.broadcast.emit('user_leave', nickname)
  })
}