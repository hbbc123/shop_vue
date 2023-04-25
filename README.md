# 项目介绍

基于vue3编写的电商平台,不同于以往由于有了(平台/商家后台)接口,对此我们可以自定义商家内容,这是目前其他接口所不具有的，如需单独的接口文件请跳转至https://github.com/hbbc123/shop  附有详细接口说明请慢慢食用

(本项目需配合shop接口使用)



## 下载此项目依赖

```
npm install
```

1.修改shop\shop\vue.config.js 

```
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: '后端的IP或者域名地址/shop/tps/public/index.php',
        pathRewrite:{'^/api':''},//路径改写
      },
    }
  }
})

```

### 

### 运行此项目

```
npm run serve
```

### 打包此项目
```
npm run build
```

