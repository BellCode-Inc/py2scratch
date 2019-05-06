/**
 * 传入block 的数组，生成对应value的结构
 * @param {Array} arr scrach所有积木代码块
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
for (let index = 0; index < array.length; index++) {
  const element = array[index];

}


