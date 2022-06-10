const viteTimeout = parseInt(import.meta.env.VITE_TIMEOUT as string)

export default {
  baseUrl: import.meta.env.VITE_BASE_URL,
  timeout: Number.isNaN(viteTimeout) ? undefined : viteTimeout,
  notJump: import.meta.env.VITE_NOT_JUMP === 'true',
}
