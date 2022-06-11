<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<script setup lang="ts">
import VConsole from 'vconsole'
import { iframeLink } from '@/hooks/codeLink'

if (location.href.indexOf('vc=1') !== -1) {
  const vConsole = new VConsole()
}

const onReturn = () => {
  iframeLink.value = ''
}
</script>

<template>
  <iframe
    v-show="iframeLink"
    :src="iframeLink"
    style="height: 100%; width: 100%; border: none;"
  />
  <router-view v-show="!iframeLink"/>
  <div v-show="iframeLink" id="return" @click="onReturn">
    返回
  </div>
</template>

<style lang="less">
#return {
  line-height: 50px;
  width: 50px;
  height: 50px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  text-align: center;
  border: 1px solid grey;
}
</style>
