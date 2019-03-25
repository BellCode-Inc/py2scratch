const filbert = require("filbert")

let ast = `
from time import sleep
from scratch import nextCostumes

def onStart():
  while(True):
     nextCostumes()
     sleep(0.1)
onStart()
`
filbert.parse(ast)

const astResult = {
  type: "Program",
  body: [
    {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "onStart"
      },
      params: [],
      body: {
        type: "BlockStatement",
        body: [
          {
            type: "WhileStatement",
            test: {
              type: "Literal",
              value: true,
              raw: "True"
            },
            body: {
              type: "BlockStatement",
              body: [
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    arguments: [],
                    callee: {
                      type: "Identifier",
                      name: "nextCostumes"
                    }
                  }
                },
                {
                  type: "ExpressionStatement",
                  expression: {
                    type: "CallExpression",
                    arguments: [
                      {
                        type: "Literal",
                        value: 0.1,
                        raw: "0.1"
                      }
                    ],
                    callee: {
                      type: "Identifier",
                      name: "sleep"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      type: "ExpressionStatement",
      expression: {
        type: "CallExpression",
        arguments: [],
        callee: {
          type: "Identifier",
          name: "onStart"
        }
      }
    }
  ]
}
