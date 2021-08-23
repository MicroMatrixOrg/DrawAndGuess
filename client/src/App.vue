<template>
  <div class="matrix-container-wrap">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {},
})
</script>

<style lang="scss" scoped>
.matrix-container-wrap {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}
</style>
