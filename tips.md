1. 多个变量一起声明
顶层节点为BlockStatement，次级body元素为VariableDeclaration或者ExpressionStatement，为ExpressionStatement表明是已经声明过的变量重新赋值，
检测次级body元素中第一个是否为VariableDeclaration或者ExpressionStatement，如果是VariableDeclaration，检测其declarations，
