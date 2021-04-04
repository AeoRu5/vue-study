import observe from './defineReactive/observe'
import Watcher from './defineReactive/Watcher'

let data = {
  a: 1,
  b: {
    c: 2
  },
  d: {
    e: [3, 4]
  },
  f: [5, 6],
  g: [7, {
    h: 8
  }],
  i: [9, {
    j: [0]
  }]
}
observe(data)
new Watcher(data, 'b.c', (newValue, oldValue) => {
  console.log(newValue, oldValue)
})
data.b.c = 3
console.log(data)
document.querySelector('#btn').onclick = (e) => {
  console.log(e);
}