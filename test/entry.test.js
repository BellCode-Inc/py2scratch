const {readFileSync} = require("fs-extra")
const {resolve} = require("path")
const {
  getBlock
} = require("../src/convert-block")
const xml2json = require("xml2json")
const filbert = require("filbert")
const getXmlStr = (ast)=>xml2json.toXml(getBlock(ast))
const cleanXml = (str)=>str.replace(/id=[^\s]+"/g,'').replace(/[xy]="\d+"/g,"").replace(/\s{2}/g,"").replace(/\n/g,"").replace(/\s/g,"")

test('project 1',()=>{
  const oXml=readFileSync(resolve(__dirname,'./project/example1.xml'),{encoding:"utf-8"})
  const pystr=readFileSync(resolve(__dirname,'./project/example1.py'),{encoding:"utf-8"})
  const ast = filbert.parse(pystr)
  const str = cleanXml(oXml)
  //TODO:不知道怎么比较，先全专程字符串比
  expect(getXmlStr(ast).replace(/\s/g,'')).toBe(str)
})
