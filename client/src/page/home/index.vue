<template>
  <div class="game-container-wrap">
    <el-container>
      <!-- 布局：头部 -->
      <el-header height="30">
        <app-header />
      </el-header>

      <!-- 布局：主体 -->
      <el-container>
        <!-- 左边 -->
        <el-aside width="400px" class="left-panel">
          <app-side-panel />
        </el-aside>

        <!-- 右边 -->
        <el-main>
          <app-stage />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, h } from 'vue'
import AppHeader from './components/app_header.vue'
import AppStage from './components/app_stage.vue'
import AppSidePanel from './components/app_side_panel.vue'
import { store } from '@/store/index'

export default defineComponent({
  name: 'Home',
  components: {
    AppHeader,
    AppStage,
    AppSidePanel,
  },
  data() {
    return {}
  },
  methods: {},
  setup() {},
})
</script>
<style lang="scss" scoped></style>
