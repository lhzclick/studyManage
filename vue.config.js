module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false, 
    outputDir:'dist',
    devServer: {
        port: 8060,     // 端口
        open: true,     // 自动打开浏览器
        proxy: {
            '/api':{
                target:process.env.VUE_APP_API_ROOT,
                changeOrigin:true,
                pathRewrite:{
                    '/api':'http://localhost:8060'
                }
            },
        }
    }
}