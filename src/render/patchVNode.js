import diff from './diff'
import { isTextNode } from './vnode'
import createElement from './createElement'

export default function patchVNode(oldVNode, newVNode) {
  if (oldVNode === newVNode) return
  if (isTextNode(newVNode)) {
    if (newVNode.text === oldVNode.text) return
    oldVNode.elm.innerText = newVNode.text
  } else {
    if (isTextNode(oldVNode)) {
      oldVNode.elm.innerText = ''
      newVNode.children.forEach(child => {
        const newElement = createElement(child)
        oldVNode.elm.appendChild(newElement)
      })
    } else {
      diff(oldVNode.elm, oldVNode.children, newVNode.children)
    }
  }
}