const filbert = require("filbert")
const xml2json = require("../json-to-xml/index")
const { nameMappingBlock } = require("./map")
const {
  defVariable,
  getVariable,
  setVariable,
  customBlockGenerator,
  useCustomBlock,
  useArg,
  appendList,
  getListLen
} = require('./generaotr')
const {btoa} = require("abab")
const hasOwnProperty =(name,property)=> Object.prototype.hasOwnProperty.call(name,property)
const pythonRuntime="__pythonRuntime"
const BinaryOperator = ['%',"-","/",">","<","=="]
const OtherOperator = ['add',"multiply"]
const UnaryOperator = ["!"]
const LogicalOperator = ["||","&&"]

const IfStatement = "IfStatement"
const VariableDeclaration = "VariableDeclaration"
const FunctionDeclaration = "FunctionDeclaration"
/**
 * while 表达式
 */
const WhileStatement = "WhileStatement"
/**
 *
 */
const ExpressionStatement = "ExpressionStatement"
/**
 * 为一个变量重新赋值
 */
const AssignmentExpression = "AssignmentExpression"
const MemberExpression = "MemberExpression"
const BlockStatement = "BlockStatement"
/**
 * 函数调用
 */
const CallExpression = "CallExpression"
/**
 *
 */
const Literal = "Literal"
const Identifier = "Identifier"
/**
 * + - * /  %
 */
const BinaryExpression = "BinaryExpression"
/**
 * and -> &&
 * or  -> ||
 * not -> !
 */
const LogicalExpression = "LogicalExpression"
/**
 *  -1
 *  --1
 *  +1
 *  ++1
 */
const UnaryExpression = "UnaryExpression"
const NewExpression = "NewExpression"
const GreenFlag = "onStart"
const FunctionDeclarationPre = ["__realArgCount","__params","__hasParams"]
let variableList = Object.create(null) //变量列表
let functionList = [] //函数列表
//TODO:区分函数作用域
let currentFunction = ''
const astNodeTypeMatch = ast => {
  switch (ast.type) {

    case FunctionDeclaration:{
      const name = ast.id.name
      if(!functionList.includes(name)){
        functionList.push(name)
      }
      currentFunction = name
      if(!functionList.obj){
        functionList.obj = {}
        functionList.arg = []

      }
      if(ast.params.length){
        functionList.arg = ast.params.map(e=>e.name)
        functionList.obj[name] = astNodeTypeMatch({...ast.body,body:ast.body.body.filter((item)=>{
          if(item.userCode ===false && item.type === VariableDeclaration&&FunctionDeclarationPre.some(i=>item.declarations[0].id.name.startsWith(i))){
            return false
          }
          if( item.type === IfStatement && item.test.left.name.startsWith(FunctionDeclarationPre[0])){
            return false
          }
          return true
        })})
      }else{
        functionList.obj[name] = astNodeTypeMatch(ast.body)
      }
      return
    }

    case BlockStatement:
      let obj = {}
      let sub = obj
      ast.body.forEach(element => {
        if (sub.hasOwnProperty("type")) {
          sub.next = {}
          sub = sub.next
        }
        sub.block = astNodeTypeMatch(element)
        sub = sub.block
      })
      return obj
    /**
     * 尽量使用重复执行代码块去处理 WhileStatement
     *  1. while True -> control_forever,boolean ->true 处理,false 抛出错误
     *  2. while statment -> 这一部分挺麻烦的，会涉及到变量的处理，以及操作的对应处理;
     */
    case WhileStatement:{
      //判断表达式
      const type = ast.test.type
      let result = {}
      // 1. number | string | boolean
      if(type === Literal){
        if (ast.test.value === true) {
           result = nameMappingBlock('forever')
          if (ast.body.body.length > 0) {
            result.statement= astNodeTypeMatch(ast.body)
            result.statement.name = "SUBSTACK"
          }
          return result
        } else {
          alert("just while(true) can match")
          throw new Error("just while(true) can match")
        }
        /**
         * 2. 变量
         *   - 已经声明的可以直接使用
         *   - 没有声明的直接报错
         *   -
         */
      }else if(type === Identifier){
        //TODO:VariableDeclaration 变量声明的一些问题
      }else{
         result = nameMappingBlock("repeat",[{type,value:astNodeTypeMatch(ast.test)}])
         result.statement= astNodeTypeMatch(ast.body)
         result.statement.name = "SUBSTACK"
      }
      return result
    }
    case IfStatement:{
      let result = {}
      if(ast.alternate===null){
        result = nameMappingBlock('if',[{...ast.test,value:astNodeTypeMatch(ast.test)}])
        result.statement=[{
          name:"SUBSTACK",
          ...astNodeTypeMatch(ast.consequent)
        }]
        return result
      }else {
        result = nameMappingBlock('ifElse',[{...ast.test,value:astNodeTypeMatch(ast.test)}])
        result.statement=[{
          name:"SUBSTACK",
          ...astNodeTypeMatch(ast.consequent)
        },{
          name:"SUBSTACK2",
          ...astNodeTypeMatch(ast.alternate)
        }]
        return result
      }

    }
    case BinaryExpression:{
      let result = {}
      if(BinaryOperator.includes(ast.operator)){
        result = nameMappingBlock(ast.operator,[{...ast.left,value:astNodeTypeMatch(ast.left)},{...ast.right,value:astNodeTypeMatch(ast.right)}])
        return result
      }else{
        alert(`just ${limitOperator.join(`  `)} can match`)
        throw new Error(`just ${BinaryOperator.join(`  `)} can match`)
      }
    }
    case LogicalExpression:{
      if(LogicalOperator.includes(ast.type)){
        const result = nameMappingBlock(ast.operator,[{...ast.left,value:astNodeTypeMatch(ast.left)},{...ast.right,value:astNodeTypeMatch(ast.right)}])
        return result
      }else{
        alert(`just ${limitOperator.join(`  `)} can match`)
        throw new Error(`just ${BinaryOperator.join(`  `)} can match`)
      }
    }
    /**
     * scratch 只有不成立代码块  对应python - > not
     *
     */
    case UnaryExpression:{
      if(UnaryOperator.includes(ast.operator)){
        nameMappingBlock('not',[{...ast.argument,value:astNodeTypeMatch(ast.argument)}])
      }else{
        alert("now UnaryExpression just support not")
        throw new Error(`now UnaryExpression just support not`)
      }
    }

    case ExpressionStatement:
      return astNodeTypeMatch(ast.expression)
    /**
     *
     */
    case AssignmentExpression:{
      const name = ast.left.name
      let result = {}
      if(ast.left.type === Identifier){
        if(!hasOwnProperty(variableList,name)){
          variableList[name]={
            isList:false
          }
        }
        result = setVariable(name,astNodeTypeMatch(ast.right),astNodeTypeMatch(ast.right))
      }else{
        throw new Error(`${ast} error`)
      }
      return result

    }
    //暂时只处理len
    case MemberExpression:{
      //len
      if(ast.property.name === "length"){
        const {type, name,arguments: args} = ast.object
        switch (type) {
          //变量
          case Identifier:{
            if(variableList[name].isList){
              return getListLen(name)
            }
            return nameMappingBlock("length",[{...ast.object,value:astNodeTypeMatch(ast.object)}])
          }
          //list
          case NewExpression:{
            return astNodeTypeMatch(ast.object)
          }

          default:
            break;
        }
      }
      return astNodeTypeMatch(ast.property)
    }
    //
    case NewExpression:{
      const {arguments:args} = ast
      let result = {}
      let temName = btoa(Date.now())
      variableList[temName] = {isList:true}
      let list = args.reduce((pre,now,index)=>{
        pre = Object.assign(pre,appendList(temName,{...now,value:astNodeTypeMatch(now)}))
        if(index === args.length-1){
          return pre
        }
        pre.next = {block:{}}
        return pre.next.block
      },result)
      Object.assign(list,{next:{block:astNodeTypeMatch({name:temName,type:Identifier})}})
      return result
    }

    case CallExpression:{
      if (ast.callee.hasOwnProperty("name")) {
        let result =null
        try {
          result = nameMappingBlock(ast.callee.name, ast.arguments.map(item=>({...item,value:astNodeTypeMatch(item)})))
          if(!result){
            if(functionList.obj.hasOwnProperty(ast.callee.name)){
              if(ast.callee.name.startsWith(GreenFlag)){
                result = nameMappingBlock(GreenFlag)
                result.next = functionList.obj[ast.callee.name]
              }else{
                result = useCustomBlock(ast.callee.name,ast.arguments,functionList.arg)
              }
            }else{
              alert(`CallExpression cant match ${ast.callee.name}`)
              throw new Error(`CallExpression cant match ${ast.callee.name}`)
            }
          }
          return result
        } catch (error) {
          console.error('errorxxxxx',error)
          return
        }
      } else if(ast.callee.type === MemberExpression){
        //TODO:限制除了 BinaryOtherOperator 以外的python内置方法
        if(ast.callee.object&&ast.callee.object.name === pythonRuntime){
          if(!OtherOperator.includes(ast.callee.property.name)){
            alert(`now we do not support ${ast.callee.property.name}`)
            throw new Error(`now we do not support ${ast.callee.property.name}`)
          }
        }
        //list 下表
        if(ast.callee.property.name === "subscriptIndex"){

          return nameMappingBlock(ast.callee.property.name, ast.arguments.map(item=>({...item,value:astNodeTypeMatch(item)})))
        }
        return nameMappingBlock(ast.callee.property.name, ast.arguments.map(item=>({...item,value:astNodeTypeMatch(item)})))
      }
    }
    case Literal:
      return ast.value
    //单个变量赋值
    case VariableDeclaration:{
      let declarations = ast.declarations
      let result = null
      if(declarations.length >1){
        throw new Error("暂时无法处理该 VariableDeclaration ",ast)
      }
      const name = declarations[0].id.name
      const {value,type,callee,arguments: args} = declarations[0].init

      if(!hasOwnProperty(variableList,name)){
        variableList[name]={isList:false}
      }
      if(type ===Literal){
        result = setVariable(name,value)
      }
      //list
      if(type === NewExpression&&callee.property.name==='list'){
        result = {}
        args.reduce((pre,now,index)=>{
          pre = Object.assign(pre,appendList(name,{...now,value:astNodeTypeMatch(now)}))
          if(index === args.length-1){
            return pre
          }
          pre.next = {block:{}}
          return pre.next.block
        },result)
        variableList[name].isList = true
      }
      if(!result){
        //todo:remove
        result = setVariable(name,'',astNodeTypeMatch(declarations[0].init))
      }
      if(!result){
        throw new Error(`暂不支持解析`,ast)
      }
      return result
    }
    /**
     * 1. 是否是函数参数
     * 2. 变量列表
     */
    case Identifier:
      if(functionList.arg&&functionList.arg.includes(ast.name)){
        return useArg(ast.name)
      }
      if(hasOwnProperty(variableList,ast.name)){
        return getVariable(ast.name,variableList[ast.name].isList)
      }
      throw new Error(`Identifier ${ast.name} cant find in variableList`)
    //TODO: 函数、变量
    default:
      throw new Error(`出现未定义的 ast node type:`,ast)
  }
}

const getBlock = ast => {
  variableList=Object.create(null)
  functionList=[]
  const temp = {
    xml: {
      xmlns: "http://www.w3.org/1999/xhtml",
      }
    }
  let temBlock = {}
  //解析多段代码
  ast.body.reduce((pre,now,index)=>{
    let tem = astNodeTypeMatch(now)
    let result = {}
    if(tem){
      result = Object.assign(pre[0],tem)
    }else{
      if(index === ast.body.length-1){
        delete pre[1].next
      }
      return [pre[1],pre[1]]
    }
    if(index!==ast.body.length-1){

      let block =result
      while(block.next&&block.next.block){
        block = block.next.block
      }
      if(block.next){
        block.next.block ={}
        return [block.next.block,result]
      }
      block.next = {block:{}}
      return [block.next.block,result]
    }
    return [result,result]
  },[temBlock,temBlock])
  temp.xml.block = temBlock.hasOwnProperty('type')?[temBlock]:[]
  //插入函数定义  -->>  自定义代码块
  functionList.filter(e=>!e.includes(GreenFlag)).forEach(i=>{
    let result = customBlockGenerator(i,functionList.arg)
    result.next={}
    result.next= functionList.obj[i]
    temp.xml.block.unshift(result)
  })
  //插入变量
  // Object.keys(variableList).forEach(element=>{
  //   temp.xml.variables.variable.push(defVariable(element,element.isList))
  // })
  console.log("functionList",functionList)
  return temp
}

const getXmlresult = py =>{
  const ast = filbert.parse(py.replace(/\[([0-9]+)\]/g,"[$1+1]"))
  return xml2json(JSON.stringify(getBlock(ast)))
}
module.exports = {getBlock,getXmlresult}
/***
 *  example
 */
const str = getXmlresult(`
i = 0
if(i == 1):
  nextCostumes()
else:
  if(i >1):
    nextCostumes()
  nextCostumes()
a = round(i)
b = i % 3
c = abs(i)
d *=3
e +=3
f = [1,2,3]
`)
 console.dir(str, {
     depth: null
   })
