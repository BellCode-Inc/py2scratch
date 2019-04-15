/**
 * @param {string} xmlStr
 * @description
 * 先准备一个空的全局对象
 * xml 为字符串
 * 每次解析接下来一个标签，
 *  遇到开标签，则把标签名作为一个新对象插入到当前上下文对象
 *      当前上下文转为新对象
 *      当前 xml 的属性成为对象的一个 key
 *      <- 需要检测当前上下文是否存在同名对象，是则统一 push 到一个数组中 ->
 *  遇到闭标签，当前上下文退到上一层对象
 *      <- 如果回退后发现是数组，继续回退到上一个非数组的上下文中 ->
 */
const xml2json = xmlStr => {
  const jsonOutput = {}
  const contextArray = [] // contextArray 元素为 jsonOutput 嵌套 key 值
  const results = xmlStr.match(/(\<.+?\>+)|([^\<\s]+)/g)

  results.forEach(element => {
    // 开标签 or 闭标签
    const isCloseTag = /\<[/]{1}/.test(element)

    if (isCloseTag) {
      contextArray.pop()
    } else {
      const parentContext = contextArray.reduce((pre, cur) => {
        return pre[cur]
      }, jsonOutput)

      const matchResult = element.match(/\<[/]?(.+)\>/)

      if (matchResult) {
        const [, tag] = matchResult

        const [tagName, ...properties] = tag.split(" ")

        const propertiesDict = properties.reduce((pre, cur) => {
          const [key, value] = cur.split("=")
          pre[key] = value.split('"')[1]
          return pre
        }, {})

        if (parentContext[tagName]) {
          if (parentContext[tagName].length) {
            parentContext[tagName] = [...parentContext[tagName], propertiesDict]
          } else {
            parentContext[tagName] = [parentContext[tagName], propertiesDict]
          }
        } else {
          parentContext[tagName] = propertiesDict

          contextArray.push(tagName)
        }
      } else {
        // 说明是末端的节点
        parentContext["$t"] = element
      }
    }
  })

  return JSON.stringify(jsonOutput)
}

module.exports = xml2json
