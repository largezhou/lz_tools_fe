/**
 * 后端返回的响应个是
 */
export interface Response<T> {
  code: number,
  data: T,
  msg: string,
  requestId: string,
}

export type Code = {
  id: number
  createTime: string
  updateTime: string
  userId: number
  name: string
  lng: number
  lat: number
  link: string
  times: number
  often: boolean
  dist: number
}
export type GetCodeListResponse = Response<Code[]>
