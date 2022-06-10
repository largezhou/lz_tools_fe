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
  getPosThenGetCodeList()
}
const onSubmit = async () => {
  const res = await saveCode(form.value)
  msg.value = res?.data?.msg || ''
  if (res.data.code === 0) {
    await router.push({ name: 'index' })
  }
}

const loc = new BMapGL.Geolocation()
const getPosThenGetCodeList = () => {
  loc.getCurrentPosition(
    (r: any) => {
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
getPosThenGetCodeList()

const onSelectFile = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (!input.files || input.files.length === 0) {
    return
  }
  form.value.file = input.files[0]
}

</script>

<template>
  <h1>保存场所码</h1>
  <div>
    <label class="label">
      <span class="label-text">ID</span>
      <span>{{ form.id || '无' }}</span>
    </label>
    <label class="label">
      <span class="label-text">名称</span>
      <input v-model="form.name" class="input-text">
    </label>
    <label class="label">
      <span class="label-text">地点</span>
      <input class="input-text" :value="address" disabled>
    </label>
    <label class="label">
      <span class="label-text">经度</span>
      <input v-model="form.lng" class="input-text">
    </label>
    <label class="label">
      <span class="label-text">纬度</span>
      <input v-model="form.lat" class="input-text">
    </label>
    <label class="label">
      <span class="label-text">场所码图片（png，jpeg，jpg）</span>
      <input type="file" accept=".png,.jpeg,.jpg" @input="onSelectFile">
    </label>
    <label class="label">
      <button @click="router.back()">取消</button>
      <button @click="onReLoc">定位</button>
      <button @click="onSubmit">提交</button>
    </label>
    <label class="label">
      <span class="label-text">{{ msg }}</span>
    </label>
  </div>
</template>

<style scoped lang="less">
.label {
  display: block;
  padding: 10px;
}

.label-text {
  display: block;
  padding: 5px 0;
}

.input-text {
  display: block;
  width: 100%;
  height: 24px;
}
</style>
