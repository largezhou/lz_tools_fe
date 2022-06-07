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

export type Code = {
  id: number
  createTime: string
  updateTime: string
  copyFromId: number
  userId: number
  name: string
  lng: number
  lat: number
  link: string
  times: number
  often: boolean
  share: boolean
  dist: number
}
export type GetCodeListResponse = Response<Code[]>
