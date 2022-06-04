import { getWechatAuthUrl } from '@/api/code'

export const jumpToAuth = async (redirect: string) => {
  const { data } = await getWechatAuthUrl(redirect)
  const url = data.data.url
  if (!url) {
    return
  }
  window.location.href = url
}
