const path = require('path')
const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'), // 2. 自己私人的 svg 存放目录
  require.resolve('antd-mobile').replace(/warn\.js$/, '') // antd-mobile 内置svg
]
const pxtorem = require('postcss-pxtorem');
export default {
  entry: 'src/index.js',
  hash: true,
  theme: './theme.config.js',
  publicPath: './',
  extraPostCSSPlugins: [
    pxtorem({
      rootValue: 50,
      propWhiteList: [],
    }),
  ],
  env: {
    development: {
      svgSpriteLoaderDirs: svgSpriteDirs,
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        [
          'import',
          {
            libraryName: 'antd-mobile',
            style: true
          }
        ]
      ]
    },
    production: {
      svgSpriteLoaderDirs: svgSpriteDirs,
      extraBabelPlugins: [
        'transform-runtime',
        [
          'import',
          {
            libraryName: 'antd-mobile',
            style: true
          }
        ]
      ]
    }
  },
  proxy: {
    '/bankant': {
      // target: 'http://172.16.1.26:9000',
      target: "http://www.weidingzhi.net/bank",

      //target: 'http://111.230.182.139:8080/dygGYBank',
      //target: 'http://new.gzdsw.com',
      changeOrigin: true
    }
  }
}
