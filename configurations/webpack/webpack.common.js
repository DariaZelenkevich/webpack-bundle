const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

//прописываем пути к основным папкам проекта,
//чтобы к ним можно было обращаться из любого
//конфигурационного файла
const PATH = {
    src: path.join(__dirname, '../../src'),
    dist: path.join(__dirname, '../../dist'),
    assets: 'assets/'

}

module.exports = {

    externals: {
        path: PATH
    },
    entry: {
       app: `${PATH.src}/index.js`,
       //login: `${PATH.src}/js/login/login.js`
    },
    output: {
        filename: `${PATH.assets}js/[name].js`,
        //если необходимо добавить хэш к названию файла
        //filename: `${PATH.assets}js/[name].[hash].js`,
        path: PATH.dist,
        //publicPath: '/' или './' указывается для разных модов отдельно
        //в каждом из файлов конфигурации
    },
    //выделяем в отдельный файл vendors всё подключаемые из
    //node_modules библиотеки. Это уменьшит объём скачиваемых 
    //файлов приложения, т.к. vendors будут скачены единожды 
    //и сохранены в кэш
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor:
                {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  MiniCssExtractPlugin.loader,
                  {
                    loader: 'css-loader',
                  },{
                    loader: 'sass-loader',
                  },{
                    loader: 'postcss-loader',
                    options: { 
                        config: { 
                            path: 'configurations/postcss.config.js' 
                        } 
                    }
                  }
                ]  
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                    loader: 'css-loader'
                    },{
                    loader: 'postcss-loader',
                    options: { config: { path: 'configurations/postcss.config.js' } }
                    }
                ]
            },
            {
                test: /\.(png|jpg|webp|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: `${PATH.assets}img/`
                }
            }, 
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                    outputPath: `${PATH.assets}fonts/`
                }                
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ]

    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "My Project",
            filename: "./index.html",
            chunks: ['app', 'vendors'],
            template: `${PATH.src}/index.html`
        }),
        new MiniCssExtractPlugin({
            filename: `${PATH.assets}css/[name].css`
            //filename: `${PATH.assets}css/[name].[hash].css`,
        })
    ]
}