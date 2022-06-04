import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 是否需要登录才能访问
    auth?: boolean,
  }
}
