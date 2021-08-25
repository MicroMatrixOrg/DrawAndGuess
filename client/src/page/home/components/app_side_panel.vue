<!--
 * @Author: David
 * @Date: 2021-08-23 14:55:31
 * @LastEditTime: 2021-08-25 17:53:35
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
        <li>
          <span>{{ nickname }}(我）</span>
          <el-tag size="mini">主持</el-tag>
        </li>
        <li>
          <span>xxx</span>
        </li>
        <li>
          <span>xxx</span>
        </li>
      </ul>
    </div>

    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <el-button type="primary" size="small" icon="el-icon-edit"
        >主持游戏</el-button
      >

      <!-- <el-button
        type="warning"
        size="small"
        icon="el-icon-delete"
      >终止游戏</el-button> -->

      <!-- <el-button
        type="success"
        size="small"
        icon="el-icon-magic-stick"
      >猜答案</el-button> -->

      <el-button type="danger" size="small" icon="el-icon-switch-button"
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

    const saveDialogHandler = () => {}

    const saveAnswerDialogHandler = () => {}

    return {
      resultDialogVisible,
      expectImageName,
      answerDialogVisible,
      inputImageName,
    }
  },
})
</script>
