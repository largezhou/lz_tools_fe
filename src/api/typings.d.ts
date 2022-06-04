/**
 * 后端返回的响应个是
 */
interface Response<T> {
  code: number,
  data: T,
  msg: string,
  requestId: string,
}

export type GetWechatAuthUrlResponse = Response<{
  url: string
}>

export type LoginResponse = Response<{
  token: string
}>
