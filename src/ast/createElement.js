import { isTextNode } from './vnode'
/* 
  将vnode插入到pivot前
*/
export default function createElement(vnode) {
  let dom = document.createElement(vnode.sel)
  if (vnode.data) {
    for (let key in vnode.data) {
      dom.setAttribute(key, vnode.data[key])
    }
  }
  if (isTextNode(vnode)) {
    dom.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length !== 0) {
    vnode.children.forEach(child => {
      dom.appendChild(createElement(child))
    })
  }
  vnode.elm = dom
  return vnode.elm
}
