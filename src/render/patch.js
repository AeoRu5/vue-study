import patchVNode from './patchVNode'
import { vnode, sameNode } from './vnode'
import createElement from './createElement'

/* 
  1.判断oldVNode是否是虚拟节点还是DOM节点 -> 如果oldVNode是DOM节点，则转为虚拟节点
  2.判断oldVNode和newVNode是不是同一个节点 -> 如果是同一个节点则精细化比较，否则替换
*/
export default function (oldVNode, newVNode) {
  if (!oldVNode.sel) { // oldVNode是DOM节点
    let props = {}
    Array.from(oldVNode.attributes, item => {
      props[item.name] = {}
      const value = item.nodeValue
      value.split(' ').map(prop => {
        props[item.name][prop] = true
      })
    })
    oldVNode = vnode(oldVNode.tagName.toLowerCase(), { props }, undefined, undefined, oldVNode)
  }

  if (sameNode(oldVNode, newVNode)) {
    patchVNode(oldVNode, newVNode)
  } else {
    const newElement = createElement(newVNode)
    oldVNode.elm.parentNode.insertBefore(newElement, oldVNode.elm)
    oldVNode.elm.parentNode.removeChild(oldVNode.elm)
  }
}

