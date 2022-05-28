export const modalPromise = async (call: (promise: any) => void) => {
  return new Promise((resolve, reject) => {
    call({ resolve, reject })
  })
}
