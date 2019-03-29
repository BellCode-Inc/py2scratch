let entryIndex = 0

const createProgramObject = ast => {
  new Array(entryIndex).fill(1).forEach((_, index) => {
    ast.push(createFunctionCall(`onStart${++index}`))
  })

  entryIndex = 0

  return {
    type: "Program",
    body: ast
  }
}

const createWhile = (test, stateMents) => ({
  type: "WhileStatement",
  test,
  body: {
    type: "BlockStatement",
    body: stateMents
  }
})

const createFunctionCall = (calleeName, funcArguments = []) => ({
  type: "ExpressionStatement",
  expression: {
    type: "CallExpression",
    arguments: funcArguments,
    callee: {
      type: "Identifier",
      name: calleeName
    }
  }
})

const createLiteralArgument = value => ({
  type: "Literal",
  value,
  raw: value.toString()
})

const createFunctionDefinition = (functionName, params = [], body) => ({
  type: "FunctionDeclaration",
  id: {
    type: "Identifier",
    name: functionName
  },
  params,
  body: {
    type: "BlockStatement",
    body: [body]
  }
})

const convertBlockToAst = ({ type, next, value, statement }) => {
  switch (type) {
    case "control_forever":
      const body = []
      let nextBlock = statement.block

      while (nextBlock) {
        body.push({ ...nextBlock, next: null })
        nextBlock = nextBlock.next && nextBlock.next.block
      }

      return createWhile(
        {
          type: "Literal",
          value: true,
          raw: "True"
        },
        body.map(convertBlockToAst)
      )
    case "event_whenflagclicked":
      return createFunctionDefinition(
        `onStart${++entryIndex}`,
        [],
        next && convertBlockToAst(next.block)
      )
    case "looks_nextcostume":
      return createFunctionCall("nextCostumes", [])

    case "control_wait":
      const {
        shadow: {
          field: { $t }
        }
      } = value
      return createFunctionCall("sleep", [createLiteralArgument($t)])
  }
}

const astCreator = ({ xml: { block: blocks } }) => {
  const ast = (blocks.length ? blocks : [blocks]).map(convertBlockToAst)
  return createProgramObject(ast)
}

module.exports = astCreator
