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
    .replace(/\<variables\>.*\<\/variables\>/,'')

    const getFile = (path)=>readFileSync(
        resolve(__dirname, path),
        {
          encoding: "utf-8"
        })
    const detect = (project,{py2scratch=false,scratch2py=false})=>{
      const originXml = getFile(`./${project}/example1.xml`)
      const pystr = getFile(`./${project}/example1.py`)
      const targetAst = filbert.parse(pystr)


      if(py2scratch){
        const clearXml = cleanXml(originXml)
        // 从 python 代码实现转换回 block xml 与 origin xml 相匹配
        expect(getXmlStr(targetAst).replace(/\s/g, "")).toBe(clearXml)
      }
      if(scratch2py){
        const clearBlockJson = JSON.parse(xml2json(originXml))
        // block json 能够正确的转换为预期的 python 代码实现
        expect(astToPy(blockJsonToAst(clearBlockJson))).toBe(pystr)
      }
    }

test("project 1 : base project", () => {
  detect('project1',{'py2scratch':true,'scratch2py':true})
})

test("project 2 : 嵌套for循环",() => {
  detect('project2',{py2scratch:true})
})
