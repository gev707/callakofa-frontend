export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

export default async function getCroppedImg(imageSrc) {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return
  }
  canvas.width = 400
  canvas.height = 400

  const cropImageSize = image.width > image.height ? image.height : image.width

  ctx.drawImage(
    image,
    image.width / 2 - cropImageSize / 2,
    image.height / 2 - cropImageSize / 2,
    cropImageSize,
    cropImageSize,
    0,
    0,
    400,
    400
  )

  // eslint-disable-next-line consistent-return
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file)
    }, 'image/jpeg')
  })
}
