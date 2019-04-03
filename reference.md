代码第一行为 from role import role1
*python 支持中文变量名，也可以考虑使用中文（角色 1*



为了适配 scratch 的下拉参数选择（实际上是枚举），我们需要提前准备几个结构体

```python
destination = {

 'random': 0,

 'followCursor': 1

}

keyboard = {
  "any": 0,
  "leftArrow": 1,
  "rightArrow": 2,
  "space": 3,
  ...

  "a",
  "b",
  "c",
  "1",
  "2",
  "3",
  ...

}

effects = {
  'color':0,     #颜色
  'fisheye':1,   #鱼眼
  'whirl':2,     #漩涡
  'pixelate':3,  #像素化
  'mosaic':4,    #马赛克
  'brightness':5,#亮度
  'ghost':6      #虚像
}

roleCrashStatus = {
  noCrash: 0,
  meetCursor: 1,
  meetStageMargin: 2
}
```

以上这些代码在编辑器内为不可修改状态

---



❌ 表示暂时不支持

- 运动

  - 移动 10 步：`role1.move(10)`

  - 右转 x 度 : `role1.turnRight(x)`

  - 左转 x 度：`role1.turnLeft(x)`

  - 移到 (随机 | 鼠标指针) 位置: `role1.moveTo(destination["random"])| role1.moveTo(destination["random"])`

  - 移到 x: y: ： `role1.moveToPoint(x, y)`

  - 在 1 秒内滑行到 (随机位置 | 鼠标指针) ： `role1.moveToPositionInTime(1, destination["random"])`

  - 在 1 秒内滑行到 x: y `role1.moveToPositionInTime(1,x,y)`

  - 面向 90 方向：`role1.towards(90)`

  - 面向鼠标指针: `role1.towardsMousePointer()`

  - 将 x 坐标增加 10：`role1.changeXBy(10)`

  - 将 x 坐标设为 10: `role1.setXTo(10)`

  - 将 y 坐标增加 10: `role1.changeYBy(10)`

  - 将 y 坐标设为 10: `role1.setYTo(10)`

  - 碰到边缘就反弹: `role1.bounceOnEdge()`

* 将旋转方式设为 （左右翻转 | 上下旋转 | 任意旋转）： ❌

* x 坐标（即在画布上显示 x 坐标）❌ （因为是一个直接勾选的选项，并没有出现在工作区）

* y 坐标 ❌

* 方向 ❌

- 外观

  - 说 （你好: string）(2: int) 秒—>`role1.sayOnTime("你好",2)`
  - 说 （你好: string）—>`role1.say('你好')`
  - 思考（嗯....: string） (2:int)秒 —> `role1.thinkOnTime("嗯....",2)`
  - 思考（嗯....: string） —> `role1.think("嗯....")
  - 换成 xxx 造型 ❌ （取决于 target 造型区有多少个造型以及实际命名）
  - 下一个造型 —> `role1.nextCostume()`
  - 换成 xxx 背景 ❌
  - 下一个背景 —>`role1.nextBackdrop()`
  - 将大小增加 10(int) —>`role1.changeSizeBy(10)`
  - 将大小设置为 10 —>`setSize(10)`
  - 将 颜色 特效增加 25(int) —>
  - 将 颜色 特效设定为 0(int) —>
  - 清楚图形特效—>`role1.clearGraphicEffects()`
  - 显示—>`role1.show()`
  - 隐藏—>`role1.hide()`
  - 移动到最 （前面|后面）—>`role1.goToFront()` `role1.goToBack()`
  - （前移|后移） 1(int) 层—>`role1.goForward(1)` `role1.goBackward(1)`
  - 造型 ❌
  - 背景 ❌
  - 大小 ❌
- 声音

  - 播放声音 (可录制的音频) 等待播完 ❌
  - 播放声音 (可录制的音频) ❌
  - 停止所有声音 —> `role1.stopAllAudio()`
  - 将 音调 | 左右平衡 音效增加 10 ❌
  - 将 音调 | 左右平衡 音效设为 10 ❌
  - 清除音效—>`role1.clearAudio()`
  - 将音量增加 -10 (int)—>`role1.changeVolumeBy(-10)`
  - 将音量设定为 100%—>`role1.setVolumeTo(100)`
  - 音量 ❌
- 事件
  - *事件目前遇到问题是，让函数作为另一个函数的参数传递，对于小朋友的理解有困难*
  - 当开始被点击 
  - 当按下 空格(enum) 键 `role1.whenClick(keyboard.space, callback )`
  - 当角色被点击
  - 当背景换成 背景 1
  - 当 (响度|计时器) > 10(int)
  - 当接收到 消息 1
  - 广播 消息 1
  - 广播 消息 1 并等待

* 控制
  - 等待 1(int) 秒 `sleep(1000)`
  - 重复执行 10 次 —> `time = 10 while(time > 0){... time = time - 1}`
  - 重复执行 —> `while(true){}`
  - 如果 xxx 那么—> `if(){}`
  - 如果 xxx 那么 xxx 否则 xxx —>`if <block> else`
  - 等待 xxx `sleepUtilCondictionTrue()`
  - 重复执行直到 ❌
  - 停止全部脚本 ❌
  - 克隆体相关 ❌
* 侦测
  - 碰到（鼠标指针 | 舞台边缘）checkIf(roleCrashStatus.meetCursor)
  - 碰到颜色 ❌
  - 到鼠标指针的距离 role.distanceToCursor()
  - 询问你的名字并等待 ❌
  - 按下空格键（enum) checkIfPress(keyboard["space"])
  - 按下鼠标
* 运算
  - x + y —>`x + y`
  - x - y —>`x - y`
  - x _ y —>`x _ y`
  - x / y —>`x / y`
  - 在 1 和 10 之间取随机树 —> random.randint(x,y+1)
  - x > y —>`x > y`
  - x < y —>`x < y`
  - x = y —>`x == y`
  - x 与 y —>`x and y`
  - x 或 y —>`x or y`
  - 不成立 —>❌
  - 连接 苹果(string) 和 香蕉(string) —> `str(apple) + str(banana)`
  - 苹果的第 1(int) 个字符 —> `x[1-1]`
  - 苹果(string) 的字符数 —> `len(apple)`
  - 苹果(string) 包含 果 —> `'apple'.find('a')>0`
  - x 除以 y 的余数 —> `x % y`
  - 四舍五入 x(number) —> `round(x)`
  - 绝对值 x(number) —> `abs(x)`
* 变量
  - 建立一个变量 x —> `x = 0`
  - 将 x 设为 0 x —> `x = 0`
  - 将 x 增加 1 —> `x=x+1`
  - 显示变量 —>❌
  - 隐藏变量 —>❌
