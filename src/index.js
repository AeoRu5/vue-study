import observe from './defineReactive/observe'
import Compile from './defineReactive/Compile'
import Watcher from './defineReactive/Watcher'

class Vue {
  constructor(options) {
    this.$options = options || {}
    this._data = options.data || undefined
    // 数据响应式
    observe(this._data)
    this._initData()
    this._initComputed()
    this._initWatch()
    // 模板编译
    new Compile(options.el, this)
  }
  _initData() {
    Object.keys(this._data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this._data[key]
        },
        set(newValue) {
          this._data[key] = newValue
        }
      })
    })
  }
  _initComputed() {

  }
  _initWatch() {
    Object.keys(this.$options.watch).forEach(key => {
      new Watcher(this, key, this.$options.watch[key])
    })
  }
}
window.Vue = Vue