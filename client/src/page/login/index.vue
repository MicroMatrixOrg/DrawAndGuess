<!--
 * @Author: David
 * @Date: 2021-08-23 14:45:11
 * @LastEditTime: 2021-08-30 16:38:18
 * @LastEditors: David
 * @Description: 登录页面
 * @FilePath: /client/src/page/login/index.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="login-main">
    <el-tag v-if="connected" type="success">服务器连接成功</el-tag>
    <el-tag v-else type="danger">服务器未连接</el-tag>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      :rules="rules"
      ref="loginForm"
    >
      <el-form-item label="昵称" prop="nickname">
        <el-input
          v-model="formInline.nickname"
          placeholder="请输入你的昵称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="startGame()">进入游戏</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, h } from 'vue'
import { ElMessageBox } from 'element-plus'
import { mapState, mapGetters } from 'vuex'
import { store } from '@/store/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  computed: {
    ...mapState(['connected']),
  },

  setup(props, context) {
    const router = useRouter()
    const formInline = ref({ nickname: '' })
    const rules = ref({
      nickname: [{ required: true, message: '请输入你的昵称' }],
    })
    const loginForm = ref()
    const startGame = () => {
      loginForm.value.validate().then(async (flag: boolean) => {
        if (!flag) return
        const nickname = formInline.value.nickname

        const isExist = await store.dispatch('checkUserExist', nickname)
        // console.log(isExist)
        if (isExist) {
          ElMessageBox.alert('该昵称已被人使用啦!')
        } else {
          // 将昵称存入本地, 跳转到主页
          localStorage.setItem('nickname', nickname)
          router.push('/home')
        }
      })
    }

    return {
      formInline,
      rules,
      loginForm,
      startGame,
    }
  },
})
</script>

<style lang="scss" scoped>
.login-main {
  display: flex;
  flex-direction: column;
  gap: 30px 0;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
