export function compareObjects<T extends object>(obj1: T, obj2: T): boolean {
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    console.log(1)
    return false
  }
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    console.log(2)

    return true
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || obj1[key as keyof T] !== obj2[key as keyof T]) {
      console.log('keykeykeykeykeykeykey')
      console.log(key)
      console.log(obj1[key as keyof T])
      console.log(obj2[key as keyof T])
      return true
    }
  }
  return false
}
