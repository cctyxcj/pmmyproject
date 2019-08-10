module.exports = {
  baseUrl: './',
  outputDir: 'h5Chat',
  assetsDir: 'assets',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/selfInsurance': {
        target: '',//接口域名 
        changeOrigin: true,//是否跨域
        pathRewrite: {
          '^selfInsurance': ''  //需要rewrite重写的
        }
      }
    }
  }
}
