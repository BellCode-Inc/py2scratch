/**
 * 传入block 的数组，生成对应value的结构
 * @param {Array} arr scrach所有积木代码块 Array.from(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace().getFlyout().getWorkspace()).querySelectorAll('block'))
 */
const getAllMap = arr => arr.reduce((pre,now)=>{
  const type = now.getAttribute('type')
  pre[type] = [type]
  const children = Array.from(now.querySelectorAll("value"))
  if(children.length>0){
    pre[type][1]=[]
    children.forEach(item=>{
      const name = item.getAttribute('name')
      const shaodw = item.querySelector("shadow")
      const shadowType = shaodw.getAttribute("type")
      const filed = shaodw.querySelector('field')
      const shadowName = filed.getAttribute('name')
      const defaultValue = filed.innerHTML
      pre[type][1].push({name,shadowName,shadowType,defaultValue})
    })
  }
  return pre
},{})

/**
 *
 * @param {object} node python ast node
 * @param {string} mes 错误信息
 */
function errorGenerator(node,mes){
  const err = new Error(mes)
  if(node.loc){
    if(node.loc.SourceLocation){
      err.position = node.loc.SourceLocation
      pickPosition2Obj(node.loc.SourceLocation,err)
    }else{
      err.position = node.loc
      pickPosition2Obj(node.loc,err)
    }
  }
  err.mes = mes
  return err
}

/**
 *
 * @param {object} position  可能含有位置信息的对象
 * @param {object} object   被赋值对象
 */
function pickPosition2Obj(position,object){
  const {start,end} = position
  if(start&&end){
    object.position=start
    if(start.line!==end.line){
      object.position=end
    }
  }
}
module.exports = {
  errorGenerator
}
