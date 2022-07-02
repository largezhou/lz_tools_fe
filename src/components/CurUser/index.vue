<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CurUser',
})
</script>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { getToken, setToken } from '@/lib/auth'

type Emits = {
  (e: 'change-user', username: string): void
}
const emit = defineEmits<Emits>()

const msg = ref('')
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const curUser = ref(getToken())
const onConfirm = () => {
  msg.value = ''
  const u = inputRef.value?.value || ''
  if (u.length < 3 || u.length > 20) {
    msg.value = '用户名长度为 3-20'
    return
  }

  curUser.value = u
  setToken(u)
  emit('change-user', u)
}
</script>

<template>
  <div class="cur-user">
    <div class="input-user">
      <input
        ref="inputRef"
        placeholder="用户名"
        class="input"
        :value="curUser"
      >
      <button type="button" class="btn" @click="onConfirm">
        确定
      </button>
    </div>
    <div class="info error">{{ msg }}</div>
  </div>
</template>

<style lang="less">
.cur-user {
  margin: 10px;

  .input-user {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;

    > input {
      flex-grow: 1;
    }

    > button {
      flex-grow: 0;
    }
  }
}
</style>
