export function convertArrayObjectToObject<T extends { [key: string]: any }>(
  array: T[],
  keyObj: string,
) {
  if (!array?.length) {

    return {}
  }
  const obj: { [key: string]: T } = {}

  array.forEach((item: T) => {
    const keyValue = item[keyObj]

    return (obj[keyValue] = item)
  })

  return obj
}
