import observe from './observe'
import Dep from './Dep'

export default function (data, key, val) {
  const dep = new Dep()
  if (arguments.length == 2) {
    val = data[key]
  }
  let childOb = observe(val)
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      console.log(`get value of ${key}`)
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set(newValue) {
      if (val === newValue) return
      console.log(`set ${key} to ${JSON.stringify(newValue)}`)
      val = newValue
      childOb = observe(newValue)
      dep.notify()
    }
  })
}