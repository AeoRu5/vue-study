import h from './ast/h'
import patch from './ast/patch'

const node = h('div', {
  key: 'box',
  id: 'box',
  class: 'container'
}, [
  h('h1', { key: 'title' }, '这里是一个标题'),
  h('ul', { key: 'ul' }, [
    h('li', { key: 'li1' }, h('span', {}, 1)),
    h('li', { key: 'li2' }, 2),
    h('li', { key: 'li3' }, 3),
    h('li', { key: 'li4' }, 4),
    h('li', { key: 'li5' }, 5),
  ])
])

const root = document.querySelector('#app')
patch(root, node)

document.querySelector('#btn').onclick = function () {
  const newNode = h('div', {
    key: 'box',
    id: 'box',
    class: 'container'
  }, [
    h('h1', { key: 'title' }, '这里是一个新的标题'),
    h('ul', { key: 'ul' }, [
      h('li', { key: 'li1' }, h('span', { class: 'li1' }, 1)),
      h('li', { key: 'li2' }, h('span', { class: 'li2' }, 2)),
      h('li', { key: 'li3' }, h('span', { class: 'li3' }, 3)),
      h('li', { key: 'li4' }, h('span', { class: 'li4' }, 4)),
      h('li', { key: 'li5' }, h('span', { class: 'li5' }, 5)),
      h('li', { key: 'li6' }, h('span', { class: 'li6' }, 6)),
    ])
  ])
  patch(node, newNode)
}