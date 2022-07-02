<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SaveCode',
})
</script>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import SaveCodeRequest from '@/pages/saveCode/typings'
import { saveCode } from '@/api/code'
import router from '@/router'
import CurUser from '@/components/CurUser/index.vue'

const form: Ref<SaveCodeRequest> = ref({
  id: undefined,
  name: '',
  lng: 0,
  lat: 0,
  file: undefined,
  often: false,
})
const address = ref('')
const timeout: Ref<number> = ref(2000)
const msg = ref('')

const onReLoc = () => {
  timeout.value = 10000
  getPos()
}
const onSubmit = async () => {
  msg.value = ''
  const res = await saveCode(form.value)
  msg.value = res?.data?.msg || ''
  if (res.data.code === 0) {
    await router.push({ name: 'index' })
  }
}

const loc = new BMapGL.Geolocation()
const getPos = () => {
  loc.getCurrentPosition(
    (r) => {
      console.log(r)

      if (loc.getStatus() === BMAP_STATUS_SUCCESS) {
        const resAddress = r.address
        address.value = `${resAddress.province}${resAddress.city}${resAddress.district}${resAddress.street}`

        form.value.lng = r.point.lng
        form.value.lat = r.point.lat
      }
    },
    {
      enableHighAccuracy: true,
      SDKLocation: true,
      timeout: timeout.value,
    },
  )
}
getPos()

const onSelectFile = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files || input.files.length === 0) {
    return
  }
  form.value.file = input.files[0]
}

</script>

<template>
  <div class="header">
    <span class="title">保存场所码</span>
  </div>
  <CurUser/>
  <div style="margin: 10px;">
    <label class="form-item">
      <span class="info">ID</span>
      <input :value="form.id || '无'" class="input" disabled>
    </label>
    <label class="form-item">
      <span class="info">名称</span>
      <input v-model="form.name" class="input">
    </label>
    <label class="form-item">
      <span class="info">地点</span>
      <input class="input" :value="address" disabled>
    </label>
    <label class="form-item">
      <span class="info">经度</span>
      <input v-model="form.lng" class="input">
    </label>
    <label class="form-item">
      <span class="info">纬度</span>
      <input v-model="form.lat" class="input">
    </label>
    <label class="form-item">
      <span class="info">场所码图片（png，jpeg，jpg）</span>
      <input type="file" accept=".png,.jpeg,.jpg" @input="onSelectFile">
    </label>
    <div>
      <button class="btn" @click="router.back()">取消</button>
      <button class="btn" @click="onReLoc">定位</button>
      <button class="btn" @click="onSubmit">提交</button>
    </div>
    <label class="form-item">
      <span class="info error">{{ msg }}</span>
    </label>
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
}

.form-item {
  display: flex;
  flex-direction: column;
  padding: 10px;

  .info {
    font-size: 16px;
  }
}
</style>
