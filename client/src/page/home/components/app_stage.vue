<!--
 * @Author: David
 * @Date: 2021-08-23 14:55:41
 * @LastEditTime: 2021-09-10 17:22:13
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
    @mousemove="mouseMoveHandler"
    @mouseup="mouseUpHandler"
  >
    <konva-component
      :stageConfig="stageConfig"
      :lines="lines"
    ></konva-component>
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, onMounted } from 'vue'
import useCurrentInstance from '@/hooks/useCurrentInstance'
import { mapState, mapGetters } from 'vuex'
import { store } from '@/store/index'
import KonvaComponent from './draw_table.vue'

interface Pointer {
  points: number[]
  stroke: string
  strokeWidth: number | string
  lineCap?: string
  lineJoin?: string
}

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
    //绘画状态
    const painting = ref(false)
    const stroke = ref('#000')
    const strokeWidth = ref(5)

    //线的集合
    let lines = reactive<Pointer[]>([])

    // 鼠标按下
    const mousedownHandler = (e: any): void => {
      if (!isGameHolder || !isGameHolder) return
      painting.value = true
      let lineObj: Pointer = {
        points: [e.layerX, e.layerY],
        stroke: '#000',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
      }
      lines.push(lineObj)
      // 本地画线, 存到vuex中
      // 请求服务器
    }
    const mouseMoveHandler = (e: any): void => {
      if (!painting.value) return
      painting.value = true
      let lastLine = lines[lines.length - 1]
      lastLine.points = lastLine.points.concat([e.layerX, e.layerY])
    }

    const mouseUpHandler = (e: any): void => {
      painting.value = false
    }

    return {
      stageConfig,
      painting,
      stroke,
      strokeWidth,
      isGameHolder,
      lines,

      mousedownHandler,
      mouseMoveHandler,
      mouseUpHandler,
    }
  },
})
</script>

<style lang="scss" scoped></style>
