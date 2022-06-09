import axios from '@/lib/axios'
import { AxiosResponse } from 'axios'
import {
  GetCodeListResponse, Response,
} from '@/api/typings'
import SaveCodeRequest from '@/pages/saveCode/typings'

export const getCodeList = (lng?: number, lat?: number): Promise<AxiosResponse<GetCodeListResponse>> => {
  return axios.post('/api/get-code-list', {
    lng,
    lat,
  })
}

export const saveCode = (data: SaveCodeRequest): Promise<AxiosResponse<Response<null>>> => {
  const formData = new FormData()
  let key: keyof SaveCodeRequest
  for (key in data) {
    if (data[key] !== undefined) {
      formData.append(key, data[key] as any)
    }
  }
  return axios.post('/api/save-code', formData)
}
