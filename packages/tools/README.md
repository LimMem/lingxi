# 基础库编译

> gulp + babel实现

暂支持build、watch两种编译方式

安装`@lingxiteam/basecli`库

```
yarn add @lingxiteam/basecli -D
```

在`package.json`中加入`script`;

```
"scripts": {
  "build": "lingxi-base build",
  "watch": "lingxi-base build --watch"
},
```

支持设置入口文件夹以及出口文件夹
```
lingxi-base build --srcDir=src --output=lib
```

