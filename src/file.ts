export function toDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.readAsDataURL(file)
  })
}

export function toText(file: File): Promise<string> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.readAsText(file)
  })
}

export function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = () => {
      resolve(fileReader.result as ArrayBuffer)
    }

    fileReader.readAsArrayBuffer(file)
  })
}
