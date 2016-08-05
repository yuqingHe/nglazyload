

## 启动方式
切换到当前根目录,命令行输入  npm install  安装依赖
```
===开发版=====
命令行输入   grunt
===发布版=====

按照Gruntfile.js中的注释,将随后一行反注释,倒数第二行注释,然后  命令行输入   grunt
之后根目录下回出现一个built2的目录
然后在index.html 和 main.js中分别将注释中的app修改为built2

回到Gruntfile.js中,将刚刚执行的操作回退(将注释反注释)  命令行输入   grunt

```