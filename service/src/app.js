/*
 * @Author: David
 * @Date: 2021-08-23 15:09:27
 * @LastEditTime: 2021-08-24 16:00:35
 * @LastEditors: David
 * @Description: 代理文件 设置服务器端口
 * @FilePath: /service/src/app.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

const http = require('http')
const express = require('express')
const app = express()
const server = http.createServer(app)

require('./reset')(app);
require('./websocket')(server);

server.listen(3002, () => {
  console.log('listening on 3002')
})
