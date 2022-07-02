<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<script setup lang="ts">
import VConsole from 'vconsole'

if (location.href.indexOf('vc=1') !== -1) {
  const vConsole = new VConsole()
}
</script>

<template>
  <router-view/>
</template>

<style lang="less">
</style>
