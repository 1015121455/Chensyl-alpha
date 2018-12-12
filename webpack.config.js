
//webpack config

var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

//var WebpackMd5Hash = require('webpack-md5-hash');

//各文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src/modules/'); //源码目录
var DIST_PATH = path.resolve(ROOT_PATH, 'dist'); //生产环境目录打包目录
var VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views/'); //模板目录
var NODE_MODULES = path.resolve(ROOT_PATH, 'node_modules'); //npm包目录

//获取构建环境
var NODE_ENV = process.env.NODE_ENV;
var isProduction = NODE_ENV ==='production' ? true : false; //生成环境
var isTest = NODE_ENV ==='testing' ? true : false; //测试环境

var entryTpl = {}; //存放模板对象 用于跟入口js对应
var plugins = []; //存放动态生成的插件数组

//入口html
var entryHtml = glob.sync(VIEWS_PATH + '/**/*.html');
//var entryHtmlArr=[];
entryHtml.forEach(function(filePath){
    var entryPath = path.dirname(filePath);
        entryPath = entryPath.substring(entryPath.lastIndexOf('\/')+1);
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    var conf = {
        template: filePath,
        filename: 'views/' + entryPath + '/'+filename + '.html',
        inject:'body',
        chunks:['babel-polyfill','vender',filename]
    }
    plugins.push(new HtmlwebpackPlugin(conf));
    entryTpl[filename] = filePath;
});

//入口js 
var entryFiles = glob.sync(SRC_PATH + '/**/*.{js,vue}');
var entryJs = {};
entryFiles.forEach(function(filePath){
    if(filePath.indexOf('common')==-1){
       // var entryPath = path.dirname(filePath);
        //entryPath = entryPath.substring(entryPath.lastIndexOf('\/')+1);
        var entryName = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
        if(entryName in entryTpl){
            entryJs[entryName] = filePath;
            //console.log(entryPath);
        }
    }
});

var extractCSS;  
if(isProduction || isTest){
    extractCSS = new ExtractTextPlugin('[name]/[name].[contenthash:20].css'); // contenthash 给css文件生成独立的hash值（与对应的js文件区分开）
     plugins.push(extractCSS,
        new UglifyJSPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            "process.env": { 
                NODE_ENV: JSON.stringify(process.env.NODE_ENV) 
            }
        }),
        new OptimizeCSSPlugin(), //压缩提取出的css，并解决ExtractTextPlugin分离出的js重复问题(多个文件引入同一css文件)
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin() //不触发错误,即编译后运行的包正常运行
        //new WebpackMd5Hash() // 解决只修改css文件时 导致引用该文件的js重复生成新hash值的问题（正常不需要）， 参考文献 http://www.cnblogs.com/ihardcoder/p/5623411.html
    );

}else{
    extractCSS = new ExtractTextPlugin('[name]/[name].css');
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
    plugins.push(extractCSS,
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new webpack.NoEmitOnErrorsPlugin(), //不触发错误,即编译后运行的包正常运行
    new FriendlyErrorsPlugin() //友好的错误提示
    ); 
}

//设置资源路径
var pubPath = '//dev.seller.kfz.com:8080/dist/';
if(isTest){
    //支持https
    pubPath = '//neibum.kongfz.com/h5/seller/';
}else if(isProduction){
    pubPath = '//m.kongfz.com/h5/seller/';
}

module.exports = {
  
  entry: Object.assign(entryJs,{ //生成公共主库文件根据项目的基础框架选择合并提取
        'vender': ['vue','vuex'],
        'babel-polyfill':'babel-polyfill'
  }),
  
  output: {
    path:DIST_PATH,
    filename: isProduction ? '[name]/[name].[chunkhash].js':'[name]/[name].js',
    publicPath: pubPath
  },

  module: {
      rules:[
          {
            test: /\.vue$/,
            exclude: /node_modules/,
            use: {
                loader: 'vue-loader',
            }
          },
           {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        // 'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name:'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name:'fonts/[name].[ext]'
                    }
                }
            }
      ]
  },
//   postcss:function(webpack){
//       return [
//           require('postcss-cssnext') ({
//               browsers: ['last 2 versions', 'Android >= 4.1']
//           }),
//           require('postcss-import'),
//           require('postcss-bem') ({
//               defaultNamespace: undefined, // default namespace to use, none by default
//               style: 'bem', // suit or bem, suit by default
//               separators: {
//                   'descendent': '_', // 设置descendent的分隔符为 '_'
//                   'modifier': '-', // 设置modifier的分隔符为'-'
//               },
//               shortcuts: {  // 配置简写
//                   'component': 'b', // 在css中可以用@b来代替component (b is for block)
//                   'modifier': 'm',
//                   'descendent': 'e'
//               }
//           })
//           ]
//   },
  resolve: {
        extensions: ['.js','.vue','.json','.css']
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    },
  plugins: [
        new webpack.optimize.CommonsChunkPlugin({
        name:['vender','babel-polyfill'],
        filename:'[name]/[name].[hash].js',
       // children:true,
        minChunks: Infinity  
    })
  ].concat(plugins),
   devtool: (isProduction ? '' : 'source-map')
   ,devServer: {
        contentBase:"./dist",
        historyApiFallback: true,
        disableHostCheck: true,
        hot: true,
        inline: true,
        progress: true,
        stats: {
            cached: false,
            colors: true
        },
        proxy: {
            '/': {
                target: 'http://seller.kfz.com',
                secure: true,
                changeOrigin: true
            }
        }
    }
};

