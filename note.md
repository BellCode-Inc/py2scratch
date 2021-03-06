# 获取 gui 项目的 xml

- `xml`结构`Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())`
- 字符串`Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))`

# 入口转化为函数定义

ps `onstart{index}`

# 可输入值代码块

`block -> value -> shadow -> [filed | block]`

# 可输入代码块代码块

`block -> value -> block`

# 可输入且能包含内嵌代码块

`block -> [value | statement| next]`

# BlockToXml 除去 id 等冗余字段的 结构

```xml
<xml xmlns="http://www.w3.org/1999/xhtml">
   <variables>
      <variable type="" islocal="false" iscloud="false">我的变量</variable>
   </variables>
   <block type="event_whenflagclicked" x="46" y="158">
      <next>
         <block type="control_forever">
            <statement name="SUBSTACK">
               <block type="looks_nextcostume">
                  <next>
                     <block type="control_wait">
                        <value name="DURATION">
                           <shadow type="math_positive_number">
                              <field name="NUM">0.1</field>
                           </shadow>
                        </value>
                     </block>
                  </next>
               </block>
            </statement>
         </block>
      </next>
   </block>
</xml>
```

- `block`中的`type`代表了`scratch-block`的`opcode`即代码块类型， 例如`event_whenflagclicked` 对应`当🚩被点击`
- 一个代码块接在另一个代码块的下面在`xml`机构中就使用`block`内`next`下一个`block`
- 有些代码块内部也可以直接嵌入代码块，例如`重复执行`代码块，被嵌入的代码块就会出现在`重复执行`代码块中的`statement`中，内部的连接顺序也通过`next`表示
- 一些代码块可以直接输入一些数值或者文字， 会有一个`value->shadow->field`的结构，例如`control_wait`对应的是`等待xx秒`

# 如何将 python 代码和 block 互相映射

- 通过`parser` python 代码生成 `ast`
- 分析`ast`与代码块映射，如果有模块的概念，可以将所有无法通过`python`内置模块表达的代码块功能收束到一个虚拟的`scratch`模块中，协定`方法名`，然而我们的`parser`无法解析`import`；如果定义函数的方法收束代码块，就必须有一个命名约束

# 缺陷

- 很多`scratch-block`的代码块无法简单的通过`python`代码表达
- `python` 代码脱离我们的环境，在真正的 py 环境中是无法使用的
- 现在的`parser`不够完备，缺少部分`Keywords` `Built-ins`

# 同类竞品实现方案猜测

- # 编程猫的`python`编辑器，内置代码块数量远远少于`scratch`,基本都是`blockly`内置的一些代码块转`python`是借助`blockly`的功能，而`python`转代码块应该是逐行对应的；真正运行是通过`skulpt`和`turtle`



# 测试用例测什么

* 目前采用集成测试，测试的基本单位是一组代码块。
* 测试需要保证一下几个环节的正确性：
  * block json 能够正确的转换为预期的 python 代码实现。
  * 从 python 代码实现转换回 block xml，除去部分 scratch 可以重新生成的 id 之类属性，应该完全匹配。

# 需要着重处理的block

* 帽子代码块（主要在事件类别，控制类别），观察者模式
* 控制类代码块，例如重复代码块、如果那么etc
* 侦测代码块的代表的condition
* 运算代码块与python原生计算的映射
* 变量代码块如何工作
