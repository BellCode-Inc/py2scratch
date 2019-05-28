const {getXmlresult} =require("../src/ast-to-block-json/index")
const str = getXmlresult(`
for i in range(9):
    for i in range(7):
        say('nihao')`)
 console.dir(str, {
     depth: null
   })
