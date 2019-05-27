const { blocks, map } = require("./dic")
const {blockGenerator} = require("./generaotr")
const {errorGenerator} =require('./../helper/index')
const otherOpeator = {

  operator_mathop:(opcode,name)=>({
      name:"OPERATOR",
      $t:name
  }),
  //list取下标
  data_itemoflist:(opcode,name,arg)=>{
    const result =  {
      name:"LIST",
      variabletype:"list",
      $t:arg[0].name
    }
  arg.unshift()
  return result
}
}
const sameAlias = {
  say :[map.say,map.say,map.sayforsecs]
}
const nameMappingBlock = (key, arg=[]) => {

  if (map.hasOwnProperty(key)) {
    let opcodeMap = map[key]
    if(sameAlias.hasOwnProperty(key)){
      opcodeMap = sameAlias[key][arg.length]
    }
    let blockTem = blocks[opcodeMap]
    let opcode = blockTem[0]
    let valueTem = blockTem[1]
    let opeator = otherOpeator[opcode]&&otherOpeator[opcode](opcode,key,arg)
    let args = arg
    if(key==="subscriptIndex"){
      args = args.slice(1)
    }
    return blockGenerator({ opcode, valueTem, arg:args,opeator })
  }else {
    throw errorGenerator({},`${key} is not define;${key} 未定义，请检查输入`)
  }
}

module.exports = {
  nameMappingBlock
}
