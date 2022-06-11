<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CurUser',
})
</script>

<script setup lang="ts">
import { ref } from 'vue'
import { getToken, setToken } from '@/lib/auth'

type Emits = {
  (e: 'change-user', username: string): void
}
const emit = defineEmits<Emits>()

const username = ref()
const curUser = ref(getToken())
const msg = ref('')
const onConfirm = () => {
  msg.value = ''
  const u = username.value?.trim() || ''
  if (u.length < 3 || u.length > 20) {
    msg.value = '用户名长度为 3-20'
    return
  }

  curUser.value = u
  setToken(u)
  emit('change-user', u)

  username.value = ''
}
</script>

<template>
  <input v-model="username">
  <button @click="onConfirm">
    确定
  </button>
  <p v-show="msg.length === 0">
    当前用户：{{ curUser }}
  </p>
  <p v-show="msg.length !== 0">
    {{ msg }}
  </p>
</template>

<style lang="less">

</style>
