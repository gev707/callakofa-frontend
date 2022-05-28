declare module '*.module.css'
declare module '*.module.css' {
  const content: Record<string, string>
  export default content
}
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'

interface ReCaptchaInstance {
  ready: (cb: () => any) => void
  execute: (
    site_key: string | undefined,
    options: ReCaptchaExecuteOptions
  ) => Promise<string>
  render: (id: string, options: ReCaptchaRenderOptions) => any
}

interface ReCaptchaExecuteOptions {
  action: string
}

interface ReCaptchaRenderOptions {
  sitekey: string
  size: 'invisible'
}
