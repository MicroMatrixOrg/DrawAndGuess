<!--
 * @Author: David
 * @Date: 2021-08-28 11:21:53
 * @LastEditTime: 2021-09-13 17:22:32
 * @LastEditors: David
 * @Description: 画布 konva封装
 * @FilePath: /client/src/page/home/components/draw_table.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <ul id="cacontainer" class=""></ul>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  reactive,
  toRefs,
  watch,
} from 'vue'
import Konva from 'konva'

// interface NewLine {
//   points: []
//   stroke: '#000'
//   strokeWidth: 5
//   lineCap?: 'round'
//   lineJoin?: 'round'
// }

export default defineComponent({
  props: {
    //画布配置
    stageConfig: {
      type: Object,
      default: {
        width: 800,
        height: 700,
      },
    },
    //颜色
    stroke: {
      type: String,
      default: '#000',
    },
    //画笔宽度
    strokeWidth: {
      type: Number,
      default: 5,
    },
    //线条的集合
    lines: {
      type: Array,
      default: [],
    },
    //一条新线
    newLine: {
      type: Object,
      default: {
        //[x1,y1,x2,y2,....]
        points: [],
        stroke: '#000',
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round',
      },
    },
  },

  setup(props, context) {
    let layer = new Konva.Layer()
    watch(props.lines, (lines, prevLines) => {
      let lastLine: any = lines[lines.length - 1]
      drawLine(new Konva.Line(lastLine))
    })

    watch(props.stageConfig, (stageConfig, pre) => {
      stage()
    })

    onMounted(() => {})

    const drawLine = (newLine: Konva.Line) => {
      layer.add(newLine)

      // add the layer to the stage
    }

    const stage = () => {
      const stage = new Konva.Stage({
        container: 'cacontainer',
        width: props.stageConfig.width,
        height: props.stageConfig.height,
      })

      stage.add(layer)
    }
  },
})
</script>

<style lang="scss" scoped></style>
