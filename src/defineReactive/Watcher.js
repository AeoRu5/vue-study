import Dep from './Dep'
import { isFunction, isTypeofObject } from '../utils/toRawType'

let id = 0
export default class Watcher {
  constructor(target, expression, callback) {
    this.id = id++
    this.target = target
    this.getter = parsePath(expression)
    this.callback = callback
    this.value = this.get()
  }
  update() {
    this.run()
  }
  get() {
    let value
    // 开始收集依赖，让全局的Dep.target等于Watcher本身
    Dep.target = this
    try {
      value = this.getter(this.target)
    } finally {
      Dep.target = null
    }
    return value
  }
  run() {
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(callback) {
    const value = this.get()
    if (value != this.value || isTypeofObject(value)) {
      const oldValue = this.value
      this.value = value
      callback && isFunction(callback) && callback.call(this.target, value, oldValue)
    }
  }
}
function parsePath(expression) {
  let segments = expression.split('.')
  return data => {
    if (!data) return
    segments.forEach(segment => {
      data = data[segment]
    })
    return data
  }
}