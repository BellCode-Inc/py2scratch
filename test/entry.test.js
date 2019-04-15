const { readFileSync } = require("fs-extra")
const { resolve } = require("path")
const { astToBlockJson, astToPy, blockJsonToAst } = require("../src/index")
const filbert = require("filbert")

const xml2json = require("../src/xml-to-json/index")

const json2xml = require("../src/json-to-xml/index")

const getXmlStr = ast => json2xml(astToBlockJson(ast))
const cleanXml = str =>
  str
    .replace(/id=[^\s]+"/g, "")
    .replace(/[xy]="\d+"/g, "")
    .replace(/\s{2}/g, "")
    .replace(/\n/g, "")
    .replace(/\s/g, "")

test("project 1", () => {
  const originXml = readFileSync(
    resolve(__dirname, "./project1/example1.xml"),
    {
      encoding: "utf-8"
    }
  )
  const pystr = readFileSync(resolve(__dirname, "./project1/example1.py"), {
    encoding: "utf-8"
  })
  const targetAst = filbert.parse(pystr)
  const clearXml = cleanXml(originXml)
  const clearBlockJson = JSON.parse(xml2json(originXml))

  // block json 能够正确的转换为预期的 python 代码实现
  expect(astToPy(blockJsonToAst(clearBlockJson))).toBe(pystr)

  // 从 python 代码实现转换回 block xml 与 origin xml 相匹配
  expect(getXmlStr(targetAst).replace(/\s/g, "")).toBe(clearXml)
})
