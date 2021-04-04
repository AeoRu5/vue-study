const str = `
  <div>
    <h1 class='box box2' id="mybox" name="aeorus'>这是h1</h1>
    <ol>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ol>
  </div>`

const smartRepeat = (str) => {
  let tag = [],
    text = [],
    tagStartRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/,
    tagEndRegExp = /^\<\/([a-z]+[1-6]?)\>/,
    textRegExp = /^([^\<\s]+)\<\/[a-z]+[1-6]?\>/,
    attrRegExp = /[^\s]+\=((\'[^\']+\')|(\"[^\"]+\"))/g

  while (str != '') {
    if (tagStartRegExp.test(str)) {
      const tagName = str.match(tagStartRegExp)[1]
      const attr = str.match(tagStartRegExp)[2]
      const props = []
      if (attr) {
        const attrs = attr.match(attrRegExp)
        attrs.map(item => {
          const key = item.split('=')[0]
          const value = item.split('=')[1].match(/[^\'\"]+/)[0]
          props.push({ name: key, value })
        })
      }
      str = str.substr(tagName.length + 2 + (attr ? attr.length : 0))
      tag.push(tagName)
      text.push({ tag: tagName, props, children: [] })
    } else if (tagEndRegExp.test(str)) {
      const tagName = str.match(tagEndRegExp)[1]
      if (text.length > 1) {
        tag.pop()
        let last = text.pop()
        text[text.length - 1].children.push(last)
      } else {
        return text[0]
      }
      str = str.substr(tagName.length + 3)
    } else if (textRegExp.test(str)) {
      const content = str.match(textRegExp)[1]
      text[text.length - 1].children.push({ text: content, nodeType: 3 })
      str = str.substr(content.length)
    } else {
      str = str.substr(1)
    }
  }
}

console.log(smartRepeat(str));