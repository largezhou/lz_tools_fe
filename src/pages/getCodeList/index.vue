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
import { Address } from '@/pages/getCodeList/typings'
import { getToken } from '@/lib/auth'
import config from '@/lib/config'
import CurUser from '@/components/CurUser/index.vue'
import { iframeLink } from '@/hooks/codeLink'

let lng: number
let lat: number

const codeList: Ref<Code[]> = ref([])
const address: Ref<Address> = ref({
  city: '',
  country: '',
  district: '',
  province: '',
  street: '',
})
const timeout: Ref<number> = ref(2000)
const curUser: Ref<string> = ref(getToken())

const onReLoc = () => {
  timeout.value = 10000
  getPosThenGetCodeList()
}

const onChangeUser = (username: string) => {
  curUser.value = username
  getPosThenGetCodeList()
}

const msg = ref('')
const loc = new BMapGL.Geolocation()
const getPosThenGetCodeList = () => {
  loc.getCurrentPosition(
    (r) => {
      console.log(r)

      if (loc.getStatus() === BMAP_STATUS_SUCCESS) {
        const resAddress = r.address
        address.value = {
          city: resAddress.city,
          country: resAddress.country,
          district: resAddress.district,
          province: resAddress.province,
          street: resAddress.street,
        }

        lng = r.point.lng
        lat = r.point.lat
      }

      getCodeList(lng, lat).then((res) => {
        if (res.data.code !== 0) {
          msg.value = res.data.msg
          return
        }

        codeList.value = res.data.data

        if (codeList.value.length > 0) {
          const code = codeList.value[0]
          const nearCode = codeList.value.filter((code) => {
            return code.dist !== -1
          })
          if (nearCode.length === 1 && !config.notJump) {
            iframeLink.value = code.link
          }
        }
      })
    },
    {
      enableHighAccuracy: true,
      SDKLocation: true,
      timeout: timeout.value,
    },
  )
}

getPosThenGetCodeList()

const onGoLink = (e: Event) => {
  const a = e.target as HTMLElement
  const href = ((e.target as HTMLElement).getAttribute('href') || '').trim()
  if (href.length > 0) {
    iframeLink.value = a.getAttribute('href') || ''
  }
}
</script>

<template>
  <h1>场所码列表</h1>
  <CurUser @change-user="onChangeUser"/>
  <p>当前地址：{{ `${address.province}${address.city}${address.district}${address.street}` }}</p>
  <button @click="onReLoc">
    重新定位
  </button>
  <router-link :to="{ name: 'saveCode' }">
    <button>添加场所码</button>
  </router-link>
  <p>{{ msg }}</p>
  <ul>
    <li v-for="code in codeList" :key="code.id">
      <h3>
        <span v-if="code.often">常用</span>
        <a :href="code.link" @click.prevent.stop="onGoLink">{{ code.name }}</a>
        <span v-if="code.dist > -1">({{ code.dist + '米' }})</span>
      </h3>
    </li>
  </ul>
</template>

<style lang="less">

</style>
