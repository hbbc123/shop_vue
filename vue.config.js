const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.150.129:100/shop/tps/public/index.php',
        pathRewrite:{'^/api':''},//路径改写
      },
    }
  }
})
