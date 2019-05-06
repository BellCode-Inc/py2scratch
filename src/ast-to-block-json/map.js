const { blocks, map } = require("./dic")
const {blockGenerator} = require("./generaotr")
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
const nameMappingBlock = (key, arg=[]) => {
  if (map.hasOwnProperty(key)) {
    let blockTem = blocks[map[key]]
    let opcode = blockTem[0]
    let valueTem = blockTem[1]
    let opeator = otherOpeator[opcode]&&otherOpeator[opcode](opcode,key,arg)
    let args = arg
    if(key==="subscriptIndex"){
      args = args.slice(1)
    }
    return blockGenerator({ opcode, valueTem, arg:args,opeator })
  }else {
    console.error(`dic中暂无与${key}匹配的项`)
  }
}

module.exports = {
  nameMappingBlock
}
