<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GetCodeList',
})
</script>

<script setup lang="ts">
import { getCodeList } from '@/api/code'
import { Code } from '@/api/typings'
import { Ref, ref } from 'vue'

let lng: number
let lat: number

const codeList: Ref<Code[]> = ref([])

const loc = new BMapGL.Geolocation()
loc.getCurrentPosition(
  function (r) {
    if (loc.getStatus() === BMAP_STATUS_SUCCESS) {
      lng = r.point.lng
      lat = r.point.lat
    }

    getCodeList(lng, lat).then((res) => {
      codeList.value = res.data.data

      if (codeList.value.length > 0) {
        const code = codeList.value[0]
        if (code.dist !== -1) {
          location.href = code.link
        }
      }
    })
  },
  {
    enableHighAccuracy: true,
    SDKLocation: true,
    timeout: 2000,
  },
)
</script>

<template>
  <h1>场所码列表</h1>
  <ul>
    <li v-for="code in codeList" :key="code.id">
      <h3>
        <span v-if="code.often">常用</span>
        <a :href="code.link">{{ code.name }}</a>
        <span v-if="code.dist > -1">({{ code.dist + '米' }})</span>
      </h3>
    </li>
  </ul>
</template>

<style lang="less">

</style>
