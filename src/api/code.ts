import axios from '@/lib/axios'
import { AxiosResponse } from 'axios'
import {
  GetCodeListResponse,
  GetWechatAuthUrlResponse,
  LoginResponse,
} from '@/api/typings'

export const getWechatAuthUrl = (redirect: string): Promise<AxiosResponse<GetWechatAuthUrlResponse>> => {
  return axios.post('/api/get-wechat-auth-url', {
    redirect,
  })
}

export const login = (code: string): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post('/api/login', {
    code,
  })
}

export const getCodeList = (lng?: number, lat?: number): Promise<AxiosResponse<GetCodeListResponse>> => {
  return axios.post('/api/get-code-list', {
    lng,
    lat,
  })
}
