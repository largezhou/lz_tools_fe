import axios from '@/lib/axios'
import { AxiosResponse } from 'axios'
import {
  GetCodeListResponse,
} from '@/api/typings'

export const getCodeList = (lng?: number, lat?: number): Promise<AxiosResponse<GetCodeListResponse>> => {
  return axios.post('/api/get-code-list', {
    lng,
    lat,
  })
}
