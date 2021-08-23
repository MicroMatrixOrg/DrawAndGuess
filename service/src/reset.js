/*
 * @Author: David
 * @Date: 2021-08-23 15:09:33
 * @LastEditTime: 2021-08-23 15:27:48
 * @LastEditors: David
 * @Description: 测试接口
 * @FilePath: /service/src/reset.js
 * 可以输入预定的版权声明、个性签名、空行等
 */
module.exports = app => {
  app.get('/api/test', (req, res) => {
    res.json({ arr: [1, 2, 3] })
  })
}