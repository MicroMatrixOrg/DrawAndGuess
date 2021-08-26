<!--
 * @Author: David
 * @Date: 2021-08-23 14:55:41
 * @LastEditTime: 2021-08-26 17:56:42
 * @LastEditors: David
 * @Description: 游戏画布页面
 * @FilePath: /client/src/page/home/components/app_stage.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-card ref="wrapper" :body-style="{ padding: 0 }">
    <canvas id="cacontainer"></canvas>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import { mapState, mapGetters, useStore } from 'vuex'
import Konva from 'konva'

export default defineComponent({
  // computed: {
  //   ...mapState(['lines']),
  //   ...mapGetters(['isGameStarted', 'isGameHolder']),
  // },
  created() {},
  setup() {
    //画布设置
    const stageConfig = ref({ width: 800, height: 700 })

    //绘画状态
    const painting = ref(false)
    const stroke = ref('#000')
    const strokeWidth = ref(5)

    const store = useStore()
    const lines = computed(() => ({
      ...mapState(['lines']),
    })).value.lines.bind({ $store: store })
    // 其他mapGetters, mapActions, mapMutations使用方式类似
    // 会便变成函数
    console.log(lines())
    // 鼠标按下
    const mousedownHandler = (e: MouseEvent) => {
      // if(!isGameHolder || !isGameHolder) return;
    }

    return {
      stageConfig,
      painting,
      stroke,
      strokeWidth,
      lines,
      mousedownHandler,
    }
  },
})
</script>

<style lang="scss" scoped></style>
