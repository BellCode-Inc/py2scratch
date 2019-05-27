const filbert = require("filbert")

const result = filbert.parse((`
while(True):
`).replace(/\[([0-9]+)\]/g,"[$1+1]"),{locations:true,ranges:true})


console.dir(result,{depth:null})
console.log(JSON.stringify(result))
/**
 * age = int(input("请输入你家狗狗的年龄: "))
print("")
if age < 0:
    print("你是在逗我吧!")
elif age == 1:
    print("相当于 14 岁的人。")
elif age == 2:
    print("相当于 22 岁的人。")
elif age > 2:
    human = 22 + (age -2)*5
    print("对应人类年龄: ", human)
 */


// print("")
// if age < 0:
//     print("你是在逗我吧!")
// else:
//     human = 22 + (age -2)*5
//     print("对应人类年龄: ", human)
// var a = {};
// [1,2,3].reduce((pre,now)=>{
//   Object.assign(pre,{value:now})
//   pre.next = {}
//   return pre.next
// },a)

const toDom =(str)=>{
  const workspace = Blockly.getMainWorkspace()
  workspace.clear()
  let dom = Blockly.Xml.textToDom(str)
  Blockly.Xml.domToWorkspace(dom,workspace)
}
