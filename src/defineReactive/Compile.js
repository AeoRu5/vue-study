import Watcher from "./Watcher"
import { isTypeofObject } from '../utils/toRawType'

export default class Compile {
  constructor(el, vue) {
    this.$vue = vue
    this.$el = isTypeofObject(el) ? el : document.querySelector(el)
    if (this.$el) {
      let $fragment = this.node2Fragment(this.$el)
      this.compile($fragment)
      this.$el.appendChild($fragment)
    }
  }
  node2Fragment(el) {
    const fragments = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragments.appendChild(child)
    }
    return fragments
  }
  compile(el) {
    el.childNodes.forEach(node => {
      if (node.childNodes && node.childNodes.length != 0) {
        console.dir(node);
        new Compile(node, this.$vue)
      }
      if (node.nodeType == 1) { // 元素节点
        this.compileElement(node)
      } else if (node.nodeType == 3 && /\{\{(.+)\}\}/.test(node.textContent)) { // 文本节点
        this.compileText(node, node.textContent.match(/\{\{(.+)\}\}/)[1])
      }
    })
  }
  compileElement(node) {
    const attributes = [].slice.call(node.attributes)
    attributes.forEach(attr => {
      const name = attr.name
      const value = attr.value
      if (/^v\-|^:|^\@/.test(name)) {
        if (name == 'v-if') {

        } else if (name == 'v-for') {

        } else if (name == 'v-model') {
          new Watcher(this.$vue, value, newValue => {
            node.value = newValue
          })
          node.value = this.getVueValue(this.$vue, value)
          node.addEventListener('input', e => {
            this.setVueValue(this.$vue, value, e.target.value)
            node.value = e.target.value
          })
        } else if (/^:/.test(name)) {

        } else if (/^@/.test(name)) {

        }
      }
    })
  }
  compileText(node, key) {
    node.textContent = this.getVueValue(this.$vue, key)
    new Watcher(this.$vue, key, newValue => {
      node.textContent = newValue
    })
  }
  getVueValue(vm, expression) {
    let value = vm
    const sagments = expression.split('.')
    sagments.forEach(sagment => {
      console.log(sagment);
      value = value[sagment]
    })
    return value
  }
  setVueValue(vm, expression, newValue) {
    let value = vm
    const sagments = expression.split('.')
    sagments.forEach((sagment, index) => {
      if (index < sagments.length - 1) {
        value = value[sagment]
      } else {
        value[sagment] = newValue
      }
    })
  }
}