import { sameNode } from './vnode'
import patchVNode from './patchVNode'
import createElement from './createElement'
/* 
  子节点更新策略
  1.新前与旧前
  2.新后与旧后
  3.新后与旧前(命中后，命中节点会移到旧后后面，并将原位置设为undefined)
  4.新前与旧后(命中后，命中节点会移到旧前前面，并将原位置设为undefined)
  命中时，所使用的指针会进行移动，前指针下移，后指针上移
  h('ul', { key: 'ul' }, [
    h('li', { key: 'li1' }, h('span', {}, 1)), // 旧前
    h('li', { key: 'li2' }, 2),
    h('li', { key: 'li3' }, 3),
    h('li', { key: 'li4' }, 4),                // 旧后
  ])
  h('ul', { key: 'ul' }, [
    h('li', { key: 'li1' }, h('span', {}, 1)), // 新前
    h('li', { key: 'li2' }, 2),
    h('li', { key: 'li3' }, 3),
    h('li', { key: 'li4' }, 4),
    h('li', { key: 'li5' }, 5),                // 新后
  ])
  while (新前 <= 新后 && 旧前 <= 旧后) {
    命中策略()
  }
*/
export default function (parentNode, oldChildren, newChildren) {
  let oldStartIdx = 0,
    oldEndIdx = oldChildren.length - 1,
    newStartIdx = 0,
    newEndIdx = newChildren.length - 1,
    oldStartVNode = oldChildren[oldStartIdx],
    oldEndVNode = oldChildren[oldEndIdx],
    newStartVNode = newChildren[newStartIdx],
    newEndVNode = newChildren[newEndIdx],
    keyMap = {}

  while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    if (!oldStartVNode) {
      oldStartVNode = oldChildren[++oldStartIdx]
    }
    if (!oldEndVNode) {
      oldEndVNode = oldChildren[--oldEndIdx]
    }
    if (sameNode(newStartVNode, oldStartVNode)) { // 新前与旧前
      console.log('命中新前与旧前')
      patchVNode(oldStartVNode, newStartVNode)
      newStartVNode = newChildren[++newStartIdx]
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (sameNode(newEndVNode, oldEndVNode)) { // 新后与旧后
      console.log('命中新后与旧后')
      patchVNode(oldEndVNode, newEndVNode)
      newEndVNode = newChildren[--newEndIdx]
      oldEndVNode = oldChildren[--oldEndIdx]
    } else if (sameNode(newEndVNode, oldStartVNode)) { // 新后与旧前
      patchVNode(oldStartVNode, newEndVNode)
      console.log('命中新后与旧前')
      // 命中节点会移到旧后后面，并将原位置设为undefined
      parentNode.insertBefore(oldStartVNode.elm, oldEndVNode.elm.nextSibling)
      oldStartVNode = undefined
      newEndVNode = newChildren[--newEndIdx]
      oldStartVNode = oldChildren[++oldStartIdx]
    } else if (sameNode(newStartVNode, oldEndVNode)) { // 新前与旧后
      console.log('命中新前与旧后')
      patchVNode(oldEndVNode, newStartVNode)
      // 命中节点会移到旧前前面，并将原位置设为undefined
      parentNode.insertBefore(oldEndVNode.elm, oldStartVNode.elm)
      oldEndVNode = undefined
      newStartVNode = newChildren[++newStartIdx]
      oldEndVNode = oldChildren[--oldEndIdx]
    } else {
      console.log('无法命中四项策略')
      if (Object.keys(keyMap).length == 0) {
        for (let i = 0; i < oldChildren.length; i++) {
          keyMap[oldChildren[i].key] = i
        }
      }
      const idxInOld = keyMap[newStartVNode.key]
      if (!idxInOld) { // 在旧树中没有的新子节点，则创建新节点插入旧前之前
        const newElement = createElement(newStartVNode)
        parentNode.insertBefore(newElement, oldStartVNode.elm)
      } else { // 在旧树中有，则移动位置到旧前之前
        parentNode.insertBefore(oldChildren[idxInOld].elm, oldStartVNode.elm)
        oldChildren[idxInOld] = undefined
      }
      newStartVNode = newChildren[++newStartIdx]
    }
  }
  if (newStartIdx <= newEndIdx) {
    console.log('新节点还有未处理项', newChildren[newStartIdx], newChildren[newEndIdx])
    // 找到新后的后一项所对应的旧子节点，准备将未处理项插入到它之前
    const afterNewEndVNode = newChildren[newEndIdx + 1] ? newChildren[newEndIdx + 1].elm : null
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      const newElement = createElement(newChildren[i])
      parentNode.insertBefore(newElement, afterNewEndVNode)
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('旧节点还有未处理项', oldChildren[oldStartIdx], oldChildren[oldEndIdx])
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      parentNode.removeChild(oldChildren[i].elm)
    }
  }
}