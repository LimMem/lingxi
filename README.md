
```javascript
// lingxirc.ts
module.exports = {
  // 存放组件文件夹路径
  libraryDir: "src/library",
  // 输出文件夹
  outputDir: 'dist',
  // 取消编译文件夹
  exclude: [],
  extraExternals: [],
  globals: {},
  // 是否导出压缩组件
  minFile: true,
  replace: {},
  // 是否类型检查
  disableTypeCheck: true,
  // ts配置项
  typescriptOpts: {},
  // 平台 app、pc
  platform: 'app',
  // globals name 名称前缀 例如：Button组件 编译后将生成LingXiButton  可在项目中通过<LingXiButton />加载
  namePrefix: "LingXi"
}
```


```javascript
// 创建app或者pc端组件库
lingxi create [libarary]  --template [app/pc]  
```

```javascript
// 项目中创建组件
lingxi g [compName] -c[c: 表示容器]
```

```javascript
// 监听文件，实时编译
lingxi build --watch
```

```javascript
// 编译某个组件 监听并开启一个服务 在终端打印出 4个服务地址
lingxi build [compName] --watch --server
```



