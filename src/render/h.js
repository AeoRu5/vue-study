import { vnode } from './vnode'
import { isArray, isObject } from '../utils/toRawType'

export default function (sel, data, c) {
  if (isArray(c)) {
    return vnode(sel, data, c)
  } else if (isObject(c) && c.hasOwnProperty('sel')) {
    return vnode(sel, data, [c])
  } else {
    return vnode(sel, data, undefined, c)
  }
}
