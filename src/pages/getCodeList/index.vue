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
const locCountdown = ref(0)
const locCountdownInterval = ref(-1)

const onReLoc = () => {
  codeList.value = []
  getPosThenGetCodeList()
}

const onChangeUser = (username: string) => {
  curUser.value = username
  getPosThenGetCodeList()
}

const msg = ref('')
const loc = new BMapGL.Geolocation()
const getPosThenGetCodeList = () => {
  locCountdown.value = 30
  locCountdownInterval.value = window.setInterval(() => locCountdown.value--, 1000)

  loc.getCurrentPosition(
    (r) => {
      console.log(r)

      window.clearInterval(locCountdownInterval.value)
      locCountdown.value = 0

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
            location.href = code.link
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
</script>

<template>
  <div class="header">
    <span class="title">场所码</span>
    <div class="actions">
      <button type="button" class="btn" @click="onReLoc">
        定位
      </button>
      <router-link :to="{ name: 'saveCode' }">
        <button type="button" class="btn">
          添加
        </button>
      </router-link>
    </div>
  </div>
  <CurUser @change-user="onChangeUser"/>
  <div class="code-list">
    <div class="pos-info">
      当前位置：{{ locCountdown > 0 ? `定位中：${locCountdown}` : `${address.province}${address.city}${address.district}${address.street}` }}
    </div>
    <div class="info error">
      {{ msg }}
    </div>
    <div>
      <a
        v-for="code in codeList"
        :key="code.id"
        :href="code.link"
        class="code-item"
      >
        <!--<span v-if="code.often">常用</span>-->
        <div class="code-name">{{ code.name }}</div>
        <div class="code-dist" v-if="code.dist > -1">{{ `距你 ${code.dist.toFixed(2)} 米` }}</div>
      </a>
    </div>
  </div>
</template>

<style lang="less">
.header {
  height: 50px;
  position: relative;
  text-align: center;
  margin: 10px;

  .title {
    font-size: 20px;
    line-height: 50px;
    font-weight: 500;
  }

  .actions {
    position: absolute;
    right: 0;
    top: 0;
  }
}

.code-list {
  margin: 10px;

  .pos-info {
    color: #3c4353;
    margin: 10px 0;
  }

  .code-item {
    background: #ffffff;
    margin-top: 10px;
    border-radius: 8px;
    display: block;
    text-decoration: none;
    color: #000000;
    padding: 20px;
    box-shadow: 1px 1px 8px 2px #e8e8e8;
  }

  .code-name {
    font-size: 16px;
    font-weight: bold;
  }

  .code-dist {
    margin-top: 10px;
    color: #818181;
  }
}
</style>
