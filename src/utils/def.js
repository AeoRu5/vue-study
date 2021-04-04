export default function (obj, key, value, enumerable) {
  Object.defineProperty(obj, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  })
}