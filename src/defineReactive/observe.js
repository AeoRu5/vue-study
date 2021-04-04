import def from '../utils/def'
import { isArray, isTypeofObject } from '../utils/toRawType'
import { arrayMethods } from './array'
import defineReactive from './defineReactive'
import Dep from './Dep'

class Observer {
  constructor(data) {
    this.dep = new Dep()
    def(data, '__ob__', this)
    if (isArray(data)) {
      this.observeArray(data)
      Object.setPrototypeOf(data, arrayMethods)
    } else {
      this.walk(data)
    }
  }
  walk(data) {
    for (let key in data) {
      defineReactive(data, key)
    }
  }
  observeArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}
export default function observe(data) {
  if (!isTypeofObject(data)) return
  let ob = null
  if (data.__ob__) {
    ob = data.__ob__
  } else {
    ob = new Observer(data)
  }
  return ob
}