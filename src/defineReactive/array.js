import def from '../utils/def'

const methodsNeedChange = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
const prototype = Array.prototype
export const arrayMethods = Object.create(prototype)

methodsNeedChange.forEach(method => {
  const originalMethod = arrayMethods[method]
  def(arrayMethods, method, function () {
    // 为push/splice/unshift插入的新项添加响应式
    const ob = this.__ob__
    let inserted = []
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = [].slice.call(arguments)
        break
      case 'splice':
        inserted = [].slice.call(arguments, 2, arguments.length)
    }
    if (inserted.length != 0) {
      ob.observeArray(inserted)
    }
    ob.dep.notify()
    return originalMethod.apply(this, arguments)
  })
})
