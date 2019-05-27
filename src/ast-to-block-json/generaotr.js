/**
 * value 模版函数
 *
 */
const valueGenerator = ({ name, shadowType, shadowName, defaultValue }) => ({
  name: name,
  shadow: {
    type: shadowType,
    field: {
      name: shadowName,
      $t: defaultValue
    }
  }
})

/**
 *
 * python ast 转换对应的 block积木
 */
const blockGenerator = ({
  opcode,
  arg,
  valueTem,
  opeator
}) => {
  let result = {
    type: opcode,
    value: []
  }
  if(opeator){
    result.field = opeator
  }

  if (arg.length === 0) {
    return result
  }

  if(valueTem === undefined){
    throw "此函数调用无需传参"
  }

  arg.forEach((element, index) => {
    //存在value
    if(valueTem[index]){
      //有默认值，可输入，可嵌入block，存在shadow value -> shadow ->field
      if(valueTem[index].shadowType){
        let obj = valueGenerator(valueTem[index])
        if (element.type === 'Literal') {
          obj.shadow.field.$t = element.value
        } else if(element.type === 'UnaryExpression'){
          obj.shadow.field.$t = Number((element.operator==='-'?'-':"")+ element.value)
        }else {
          obj.block = element.value
        }
        result.value.push(obj)
      }else{
        //不可输入，只能嵌入代码块
        result.value.push({block:element.value,name:valueTem[index].name,})
      }

    }

  })

  return result
}

/**
 * 定义自定义代码块
 * @param {String} name 变量名称
 * @param {Boolean} isList 是否为list类型
 * @param {Boolean} global 是否所有角色都能使用,默认false
 */
const defVariable = (name,isList=false,global=false)=>({
    type:isList?"list":"",
    islocal:global,
    $t:name
})

const getVariable = (name,isList=false)=>({
    type:isList?"data_listcontents":"data_variable",
    field:{
      name:isList?"LIST":"VARIABLE",
      variabletype:isList?"list":"",
      $t:name
    }
})

const setVariable =(name,value='',block='')=>{
  const result = {
      type:"data_setvariableto",
      field:{
        name:"VARIABLE",
        variabletype:'',
        $t:name
      },
      value:{
        name:"VALUE",
        shadow:{
          type:"text",
          field:{
            name:"TEXT",
            $t:value
          }
        },
    }
  }
  if(block.type){
    result.value.shadow.field.$t =""
    result.value.block = block
  }
  return result
}

/**
 * 定义自定义代码块
 * @param {String} name 自定义代码块名称
 * @param {Array} arg 自定义代码块参数名
 */
const customBlockGenerator = (name,arg)=>{
  let  result = {
    type:'procedures_definition',
    statement:{
      name:"custom_block",
      shadow:{
        type:"procedures_prototype",
        mutation:{
          proccode:`${name} ${Array(arg.length).fill('%s').join(' ')}`,
          argumentids:`[${arg.map(i=>`&quot;${i}&quot;`).join(",")}]`,
          argumentnames:`[${arg.map(i=>`&quot;${i}&quot;`).join(",")}]`,
          argumentdefaults:`[${arg.map(i=>`&quot;&quot;`).join(",")}]`,
          warp:false
        },
        value:[]
      }
    }
  }
  arg.forEach(i=>{
    const value = {
      name:i,
      shadow:{
        type:"argument_reporter_string_number",
        field:{
          name:"VALUE",
          $t:i
        }
      }
    }
    result.statement.shadow.value.push(value)
  })
  return result
}
/**
 * 自定义代码块
 * @param {String} name 自定义代码块名称
 * @param {Array} realArg 实际参数，自定义代码块参数代码块或者string|number
 * @param {Array} arg 形参的名字
 */
const useCustomBlock = (name,realArg,arg)=>{
  const result = {
    type:'procedures_call',
    mutation:{
      proccode:`${name} ${Array(realArg.length).fill('%s').join(' ')}`,
      argumentids:`[${arg.map(i=>`&quot;${i}&quot;`).join(',')}]`,
      wrap:false,
    },
    value:[]
  }
  realArg.forEach((i,index)=>{
    let value = {
      name:arg[index],
      shadow:{
        type:'text',
        field:{
          name:"TEXT",
          $t:""
        }
      }
    }
    if(i.type === 'Literal'){
      value.shadow.field.$t = i.value
    }else if(i.type === 'Identifier'){
      value.block = getVariable(i.name)
    }else{
      console.error(`参数${arg[index]} 中的${i} 无法匹配`)
    }
    result.value.push(value)
  })
  return result
}
/**
 *
 * @param {string} name 自定义代码块参数，不允许教学上使用 布尔值
 */
const useArg = (name)=>({
  type:"argument_reporter_string_number",
  field:{
    name:"VALUE",
    $t:name
  }
})

/**
 *
 * @param {String} list 名称
 * @param {Object} value 加入的值，如果值为list会将list的值join ps:[1,2,3]=>123
 * @param {String} value.type 类型
 * @param {String|Object} value.value
 */
const appendList =(name,{value,type})=>{

  let  result = {
  type :"data_addtolist",
  field:{
    name:"LIST",
    variabletype:"list",
    $t:name
  },
  value:{
      name:"ITEM",
      shadow:{
        type:"text",
        field:{
          name:"TEXT",
          $t:""
        }
      }
    }
}
if(type === 'Literal'){
  result.value.shadow.field.$t = value
}else{
  result.value.block = value
}
return result
}

const getListLen = (name)=>({
  type:"data_lengthoflist",
  field:{
    name:"LIST",
    variabletype:"list",
    $t:name
  }
})
module.exports = {
  blockGenerator,
  defVariable,
  getVariable,
  setVariable,
  customBlockGenerator,
  useCustomBlock,
  useArg,
  appendList,
  getListLen
}

