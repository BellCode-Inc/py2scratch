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
const {errorGenerator} = require("./../helper/index")
const {btoa} = require("abab")
const hasOwnProperty =(name,property)=> Object.prototype.hasOwnProperty.call(name,property)
const pythonRuntime="__pythonRuntime"
const BinaryOperator = ['%',"-","/",">","<","=="]
const OtherOperator = ['add',"multiply"]
const UnaryOperator = ["!",'+','-']
const LogicalOperator = ["||","&&"]

const IfStatement = "IfStatement"
const VariableDeclaration = "VariableDeclaration"
const FunctionDeclaration = "FunctionDeclaration"
const ForStatement = "ForStatement"
const ForInStatement = "ForInStatement"
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
// let currentFunction = ''
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
      const realBody = ast.body.body.filter((item)=>{
        if(item.userCode ===false && item.type === VariableDeclaration&&FunctionDeclarationPre.some(i=>item.declarations[0].id.name.startsWith(i))){
          return false
        }
        if( item.type === IfStatement && item.test.left.name.startsWith(FunctionDeclarationPre[0])){
          return false
        }
        return true
      })
      if(realBody.length<1){
        throw errorGenerator(ast.body,"Expected indented block;需要缩进")
      }
      if(ast.params.length){
        functionList.arg = ast.params.map(e=>e.name)
        functionList.obj[name] = astNodeTypeMatch({...ast.body,body:realBody})
      }else{
        functionList.obj[name] = astNodeTypeMatch(ast.body)
      }
      return
    }
    //for 循环 ast node 也会以BlockStatement开始
    case BlockStatement:{
      //确保是for 循环
      if(ast.body.length === 2){
        if((ast.body[0].type === VariableDeclaration && ast.body[0].declarations[0].id.name.startsWith('__filbertRight'))&&(
          ast.body[1].type === IfStatement && ast.body[1].consequent.body[0].type === ForStatement && ast.body[1].alternate.body[0].type === ForInStatement
        )){
          //只能支持 for i in range(x) 这种形式，i 无法在循环体中使用，range只能为一个数字参数
          const args = ast.body[0].declarations[0].init.arguments
          if(args.length>1){
            throw errorGenerator(ast.body[0].declarations[0].init.callee.property,"当前环境for循环只支持range单个参数")
          }
          if(args.length === 0){
            throw errorGenerator(ast.body[0].declarations[0].init.callee.property,"for 循环 range() 内需要填写循环次数")
          }
          const ifBody = ast.body[1].alternate.body[0].body
          if(ifBody.body.length<1){
            throw errorGenerator(ifBody,"Expected indented block;需要缩进")
          }
          let result = nameMappingBlock("repeat",[ast.body[0].declarations[0].init.arguments[0]])
          result.statement= astNodeTypeMatch(ifBody)
          result.statement.name = "SUBSTACK"
       return result
        }
      }
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
    }
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
           if(ast.body.body.length<1){
            throw errorGenerator(ast.body,'Expected indented block;需要缩进')
          }
          if (ast.body.body.length > 0) {
            result.statement= astNodeTypeMatch(ast.body)
            result.statement.name = "SUBSTACK"
          }
          return result
        } else {
          throw errorGenerator({},"just while(true) can match;暂时支持while(True)转换")
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
        if(ast.consequent.body.length<1){
          throw errorGenerator(ast.consequent,'Expected indented block;需要缩进')
        }
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
        throw errorGenerator({},`just ${BinaryOperator.join(`  `)} can match`)
      }
    }
    case LogicalExpression:{
      if(LogicalOperator.includes(ast.type)){
        const result = nameMappingBlock(ast.operator,[{...ast.left,value:astNodeTypeMatch(ast.left)},{...ast.right,value:astNodeTypeMatch(ast.right)}])
        return result
      }else{
        throw errorGenerator({},`just ${BinaryOperator.join(`  `)} can match`)
      }
    }
    /**
     * scratch 只有不成立代码块  对应python - > not
     *
     */
    case UnaryExpression:{
      if(UnaryOperator.includes(ast.operator)){
        if(['+','-'].includes(ast.operator)){
          return ast.argument.value
        }
        nameMappingBlock('not',[{...ast.argument,value:astNodeTypeMatch(ast.argument)}])
      }else{
        throw errorGenerator({},`now UnaryExpression just support not`)
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
        throw errorGenerator(ast,`${ast} error;${ast} 转换错误，请检查输入`)
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
          // if(!result){
            if(functionList&&functionList.obj&&functionList.obj.hasOwnProperty(ast.callee.name)){
              if(ast.callee.name.startsWith(GreenFlag)){
                result = nameMappingBlock(GreenFlag)
                result.next = functionList.obj[ast.callee.name]
              }else{
                result = useCustomBlock(ast.callee.name,ast.arguments,functionList.arg)
              }
            // }else{
              // throw errorGenerator(ast,`${ast.callee.name} is not define`)
            // }
          }else{
          result = nameMappingBlock(ast.callee.name, ast.arguments.map(item=>({...item,value:astNodeTypeMatch(item)})))
          }
          return result
        } catch (error) {
          throw errorGenerator(ast,`${error}`)
        }
      } else if(ast.callee.type === MemberExpression){
        //TODO:限制除了 BinaryOtherOperator 以外的python内置方法
        if(ast.callee.object&&ast.callee.object.name === pythonRuntime){
          if(!OtherOperator.includes(ast.callee.property.name)){
            throw errorGenerator({},`now we do not support ${ast.callee.property.name}`)
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
        throw errorGenerator(ast,"暂时不支持多元赋值")
      }
      const name = declarations[0].id.name
      const {value,type,callee,arguments: args,prefix,argument,operator} = declarations[0].init

      if(!hasOwnProperty(variableList,name)){
        variableList[name]={isList:false}
      }
      if(type === UnaryExpression &&prefix &&argument.value){
        result = setVariable(name,Number((operator==='-'?"-":'')+argument.value))
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
        throw errorGenerator(ast,`暂不支持解析`)
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
      throw errorGenerator(ast,`${ast.name} is not define；${ast.name} 未定义`)
    //TODO: 函数、变量
    default:
      throw errorGenerator(ast,`${ast.name} is not define；${ast.name} 未定义`,)
  }
}

const getBlock = (ast,autoStart) => {
  variableList=Object.create(null)
  functionList=[]
  let temp = {
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
  let start = temBlock
  if(autoStart){
    start = nameMappingBlock(GreenFlag)
    start.next = {block:temBlock}
  }
  temp.xml.block = temBlock.hasOwnProperty('type')?[start]:[]
  //插入函数定义  -->>  自定义代码块
  functionList.filter(e=>!e.includes(GreenFlag)).forEach(i=>{
    let result = customBlockGenerator(i,functionList.arg)
    result.next={}
    result.next= functionList.obj[i]
    temp.xml.block.unshift(result)
  })

  return temp
}

const getXmlresult = (py,autoStart = true) =>{
  const ast = filbert.parse(py.replace(/\[([0-9]+)\]/g,"[$1+1]"),{locations:true,ranges:true})
  return xml2json(JSON.stringify(getBlock(ast,autoStart)))
}
module.exports = {getBlock,getXmlresult}
