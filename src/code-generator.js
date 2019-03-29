let currentIndent = 0
const makeIndent = code => {
  return (
    new Array(currentIndent)
      .fill(1)
      .map(_ => `  `)
      .join("") + code
  )
}

const codeGenerator = ast => {
  const { type } = ast
  switch (type) {
    case "BlockStatement":
      return ast.body
        .map(codeGenerator)
        .map(makeIndent)
        .join("")
    case "Program":
      return ast.body.map(codeGenerator).join("")
    case "ExpressionStatement":
      return codeGenerator(ast.expression) + "\n"
    case "Literal":
      return ast.value
    case "FunctionDeclaration":
      currentIndent += 1
      const {
        id: { name: functionName },
        body
      } = ast
      const functionDeclaration = `def ${functionName}():\n${codeGenerator(
        body
      )}`
      currentIndent -= 1
      return functionDeclaration
    case "CallExpression":
      const {
        callee: { name }
      } = ast
      return `${name}()`
    case "WhileStatement":
      const { test } = ast
      currentIndent += 1
      const whileStatement = `while(${codeGenerator(test)}):\n${codeGenerator(
        ast.body
      )}`
      currentIndent -= 1
      return whileStatement
  }
}

module.exports = codeGenerator
