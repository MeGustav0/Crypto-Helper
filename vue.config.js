const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://pro-api.coinmarketcap.com/v1',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
        pathRewrite: { '^/api': '' }
      }
    }
  }
})
