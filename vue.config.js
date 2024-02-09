const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {},
        },
        additionalData: `
          @import "~@/styles/css/var.less";
        `,
      },
    },
  },

  chainWebpack(config) {
    config.module.rule('svg').exclude.add(resolve('src/assets/svg')).end()
    config.module
      .rule('svg-sprite-loader')
      .test(/.svg$/)
      .include.add(resolve('src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'svg-[name]' })
    config.plugin('html').tap((args) => {
      args[0].title = name.toUpperCase()
      return args
    })
  },

  devServer: {
    port: 5000,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: false,
      },
    },
  },
})
