<!--
 * @Author: David
 * @Date: 2021-08-23 14:55:16
 * @LastEditTime: 2021-08-25 16:48:49
 * @LastEditors: David
 * @Description: 游戏页面的顶部
 * @FilePath: /client/src/page/home/components/app_header.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="app-header">
    <el-tag v-if="connected" type="success">服务已连接</el-tag>
    <el-tag v-else type="danger">服务未连接</el-tag>

    <el-tag v-if="isGameStarted" type="success">游戏进行中</el-tag>
    <el-tag v-else type="info">游戏未开始</el-tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { mapState, mapGetters } from 'vuex'

export default defineComponent({
  computed: {
    ...mapState(['connected']),
    ...mapGetters(['isGameStarted']),
  },
})
</script>

<style lang="scss" scoped>
.app-header {
  padding: 10px;
}
.el-tag {
  margin-right: 10px;
}
</style>
