module.exports = {
    presets: [["@vue/app",{"useBuiltIns": "entry"}]],
    plugins: [
        // "@babel/plugin-transform-arrow-functions",
        // "@babel/plugin-transform-block-scoping" ,
        // "@babel/plugin-transform-runtime"
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
}
