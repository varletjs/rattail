export function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as ArrayBuffer)
    }

    fileReader.readAsArrayBuffer(file)
  })
}
