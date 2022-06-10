/// <reference types="vite/client.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  // 后端 url
  readonly VITE_BASE_URL?: string
  readonly VITE_TIMEOUT?: string
  // 开发的时候，匹配到不跳转
  readonly VITE_NOT_JUMP?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
