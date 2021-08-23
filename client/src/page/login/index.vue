<!--
 * @Author: David
 * @Date: 2021-08-23 14:45:11
 * @LastEditTime: 2021-08-23 22:32:08
 * @LastEditors: David
 * @Description: 登录页面
 * @FilePath: \client\src\page\login\index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="login-main">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="formInline.nickname"
          placeholder="请输入你的昵称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startGame">进入游戏</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, h } from 'vue'

export default defineComponent({
  name: 'Login',
  data() {
    return {
      //表单信息
      formInline: { nickname: '' },
      //表单校验规则
      rules: {
        nickname: [{ required: true, message: '请输入你的昵称' }],
      },
    }
  },
  mounted() {},
  methods: {
    startGame() {
      // if (!this.formInline.nickname)
      // this.$notify.error({
      //   title: '错误',
      //   message: '昵称不能为空',
      // })
    },
  },
})
</script>

<style lang="scss" scoped>
.login-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
