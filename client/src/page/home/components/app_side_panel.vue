<!--
 * @Author: David
 * @Date: 2021-08-23 14:55:31
 * @LastEditTime: 2021-08-26 15:28:36
 * @LastEditors: David
 * @Description: 游戏页面，用户列表，开始游戏
 * @FilePath: /client/src/page/home/components/app_side_panel.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-card>
    <!-- 玩家列表 -->
    <div class="panel-area">
      <ul class="participants">
        <li v-for="(user, index) in nicknames" :key="index">
          <span>{{ user }} {{ user === nickname ? '(我)' : '' }} </span>
          <el-tag size="mini" v-if="holder === user">主持</el-tag>
        </li>
      </ul>
    </div>

    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="stareGameHandler"
        v-if="!isGameStarted"
        >主持游戏</el-button
      >
      <el-button
        type="warning"
        size="small"
        icon="el-icon-delete"
        v-if="isGameStarted && holder === nickname"
        >终止游戏</el-button
      >

      <el-button
        type="success"
        size="small"
        icon="el-icon-magic-stick"
        v-if="isGameStarted && holder !== nickname"
        >猜答案</el-button
      >

      <el-button
        type="danger"
        size="small"
        icon="el-icon-switch-button"
        @click="exitHanle"
        >退出游戏</el-button
      >
    </div>

    <!-- 弹出框：主持人设置答案 -->
    <el-dialog title="请设置答案" v-model="resultDialogVisible" width="30%">
      <el-input v-model="expectImageName" placeholder="请输入您的答案" />

      <template #footer class="dialog-footer">
        <el-button @click="resultDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDialogHandler">确 定</el-button>
      </template>
    </el-dialog>

    <!-- 弹出框：答题人设置答案 -->
    <el-dialog title="请填写答案" v-model="answerDialogVisible" width="30%">
      <el-input v-model="inputImageName" placeholder="请输入您的答案" />

      <template #footer class="dialog-footer">
        <el-button @click="answerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAnswerDialogHandler"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue'
import { mapState, mapGetters } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'
import { store } from '../../../store/index'
import router from '../../../router'

export default defineComponent({
  computed: {
    ...mapState(['nickname', 'nicknames', 'holder']),
    ...mapGetters(['isGameStarted']),
  },
  setup() {
    let resultDialogVisible = ref(false)
    let expectImageName = ref('')
    let answerDialogVisible = ref(false)
    let inputImageName = ref('')

    //打开提示框
    const stareGameHandler = () => {
      resultDialogVisible.value = true
      //清空答案
      expectImageName.value = ''
    }
    //保存游戏答案
    const saveDialogHandler = () => {
      //1、答案不能为空
      if (!expectImageName.value) {
        ElMessage.error('答案不能为空')
      }
      //请求接口
      store.dispatch('sendStartGame', expectImageName.value)
      //关闭弹框
      resultDialogVisible.value = false
    }

    //退出游戏
    const exitHanle = () => {
      ElMessageBox.confirm('是否退出游戏', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          store.dispatch('sendUserLeave')
          router.replace('/login')
        })
        .catch((e: any) => {
          ElMessage.info(e)
        })
    }

    const saveAnswerDialogHandler = () => {}

    return {
      resultDialogVisible,
      expectImageName,
      answerDialogVisible,
      inputImageName,
      stareGameHandler,
      saveDialogHandler,
      saveAnswerDialogHandler,
      exitHanle,
    }
  },
})
</script>
