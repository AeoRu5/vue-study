/*
  1.在getter中收集依赖，在setter中触发依赖
  2.依赖收集封装成Dep，每个Observer的实例的成员中都有一个Dep的实例
  3.依赖就是Watcher，只有Watcher触发了getter才会收集依赖哪个Watcher触发了getter，就把哪个Watcher收集到Dep中
  4.Dep使用发布订阅模式，当数据发生变化时，会循环依赖列表，把所有的Watcher都通知一遍
  5.Watcher把自己设置到全局的一个指定位置，然后读取数据，因为读取了数据，所以才会触发这个数据的getter。在getter中就能得到当前正在读取数据的Watcher，并把这个Watcher收集到Dep中
*/
let id = 0
export default class Dep {
  constructor() {
    this.id = id++
    this.subs = []
  }
  // 添加订阅者
  addSub(sub) {
    this.subs.push(sub)
  }
  // 添加依赖
  depend() {
    // Dep.target||Window.target是指定watcher的位置
    if (Dep.target) {
      this.addSub(Dep.target)
    }
  }
  // 通知更新
  notify() {
    this.subs.forEach(sub => sub.update())
  }
}