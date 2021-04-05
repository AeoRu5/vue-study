function is(type, isTypeof) {
  if (isTypeof) {
    return function (obj) {
      return typeof (obj) === type
    }
  }
  return function (obj) {
    return Object.prototype.toString.call(obj) == `[object ${type}]`
  }
}
export const isArray = is('Array')
export const isObject = is('Object')
export const isTypeofObject = is('object', true)
export const isNumber = is('Number')
export const isString = is('String')
export const isBoolean = is('Boolean')
export const isUndef = is('Undefined')
export const isNull = is('Null')
export const isFunction = is('Function')
export const isHTML = is('HTMLUListElement')