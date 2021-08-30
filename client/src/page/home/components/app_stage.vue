<!--
 * @Author: David
 * @Date: 2021-08-23 14:55:41
 * @LastEditTime: 2021-08-30 17:02:31
 * @LastEditors: David
 * @Description: 游戏画布页面
 * @FilePath: /client/src/page/home/components/app_stage.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <el-card
    ref="wrapper"
    :body-style="{ padding: 0 }"
    @mousedown="mousedownHandler"
  >
    <konva-component :stageConfig="stageConfig"></konva-component>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, onMounted } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { mapState, mapGetters } from 'vuex'
import { store } from '@/store/index'
import KonvaComponent from './draw_table.vue'
export default defineComponent({
  computed: {
    ...mapState(['lines']),
    ...mapGetters(['isGameHolder', 'isGameStarted']),
  },
  components: {
    KonvaComponent,
  },
  mounted() {},
  setup(props, { attrs, slots, emit }) {
    //获取当前组件实例
    const { globalProperties } = useCurrentInstance()
    onMounted(() => {})

    //画布设置
    const stageConfig = ref({ width: 800, height: 700 })
    const isGameHolder = computed(() => store.getters.isGameHolder)
    console.log(isGameHolder)
    //绘画状态
    const painting = ref(false)
    const stroke = ref('#000')
    const strokeWidth = ref(5)

    // 鼠标按下
    const mousedownHandler = (e: MouseEvent) => {
      if (!isGameHolder || !isGameHolder) return
    }

    return {
      stageConfig,
      painting,
      stroke,
      strokeWidth,
      isGameHolder,
      mousedownHandler,
    }
  },
})
</script>

<style lang="scss" scoped></style>
