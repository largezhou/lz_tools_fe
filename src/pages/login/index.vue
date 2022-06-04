<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Login',
})
</script>

<script setup lang="ts">
import router from '@/router'
import { WechatAuthQueryData } from '@/pages/login/typings'
import { login } from '@/api/code'
import { ref } from 'vue'
import { redirectTendTo, setToken } from '@/lib/auth'

const loading = ref(false)
const code = ref('')
const token = ref('')

const query: WechatAuthQueryData = (router.currentRoute.value.query as any) as WechatAuthQueryData
code.value = query.code

if (code.value) {
  (async (code: string) => {
    loading.value = true
    const { data } = await login(code)
    loading.value = false
    token.value = data.data.token
    setToken(token.value)
    redirectTendTo()
  })(code.value)
}
</script>

<template>
  <h1 v-show="!query.code">
    无法获取微信授权 code
  </h1>
  <h1 v-if="loading">
    登录中
  </h1>
  <h1 v-else-if="!loading && !token">
    登录失败
  </h1>
  <h1 v-else>
    登录成功
  </h1>
</template>

<style lang="less">

</style>
