let count = +new Date()

export function vnode(sel, data, children, text, elm) {
  let key
  if (data.key) {
    key = data.key
    delete data.key
  } else {
    key = count
  }
  return { sel, data, children, text, elm, key }
}

export function isTextNode(vnode) {
  return vnode.text && vnode.text !== '' && (!vnode.children || vnode.children.length == 0)
}

export function sameNode(oldVNode, newVNode) {
  return oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel
}