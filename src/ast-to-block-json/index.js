const xml2json = require("xml2json")
const { nameMappingBlock } = require("./map")

const GreenFlag = "onStart"
const astNodeTypeMatch = ast => {
  switch (ast.type) {
    case "FunctionDeclaration":
      const params = ast.params
      let typeObj
      if (ast.id.name.startsWith(GreenFlag)) {
        //TODO: 可能会用到上下文信息 例如 ast.body.context = 'onStart'
        typeObj = nameMappingBlock(GreenFlag, params)
      } else {
        typeObj = nameMappingBlock(ast.id.name, params)
      }
      return {
        ...typeObj,
        next: astNodeTypeMatch(ast.body)
      }
    case "BlockStatement":
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
    case "WhileStatement":
      if (ast.test.value !== true) {
        throw new Error("just while(true) can match")
      } else {
        const result = {
          type: "control_forever"
        }
        if (ast.body.body.length > 0) {
          result.statement = astNodeTypeMatch(ast.body)
          result.statement.name = "SUBSTACK"
        }
        return result
      }

    case "ExpressionStatement":
      return astNodeTypeMatch(ast.expression)

    case "CallExpression":
      if (ast.callee.hasOwnProperty("name")) {
        return nameMappingBlock(ast.callee.name, ast.arguments)
      } else {
        return nameMappingBlock(ast.callee.property.name, ast.arguments)
      }

    case "Identifier":

    default:
      throw new Error("出现为定义的 ast node type")
  }
}

const getBlock = ast => {
  const temp = {
    xml: {
      xmlns: "http://www.w3.org/1999/xhtml",
      variables: {
        variable: {
          type: "",
          islocal: "false",
          $t: "我的变量"
        }
      }
    }
  }
  temp.xml.block = astNodeTypeMatch(ast.body[0])
  return temp
}

module.exports = getBlock

/* example
 ** const {
 **   astResult
 ** } = require("./xml/default/ast-result")
 ** let str = xml2json.toXml(JSON.stringify(getBlock(astResult)))
 ** console.dir(str, {
 **   depth: null
 ** })
 */

/*  Blockly 调用
const Blockly = require("scratch-block")
const xmlStrToWorkspace = (str)=>{
  domToWorkspace = Blockly.Xml.domToWorkspace
  textToDom = Blockly.Xml.textToDom
  domToWorkspace(textToDom(str))
}
*/
