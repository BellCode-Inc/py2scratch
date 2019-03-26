const fs = require("fs")
const parser = require("xml2json")
const util = require("util")
const { createProgramObject, convertBlockToAst } = require("./ast-creator")
const codeGenerator = require("./code-generator")
// const prettier = require("prettier")

const xmlString = parser.toJson(
  fs.readFileSync(`${__dirname}/xml/default/project.xml`)
)
// fs.writeFileSync(`${__dirname}/xml/default/project.json`, xmlString)
const {
  xml: { block: blocks }
} = JSON.parse(xmlString)

const ast = (blocks.length ? blocks : [blocks]).map(convertBlockToAst)

const program = createProgramObject(ast)

const pythonCode = codeGenerator(program)

console.log(pythonCode)
