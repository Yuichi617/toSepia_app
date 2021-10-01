const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

    /* バンドルモードの指定 (開発モード(development) or 本番モード(production)) */
    mode: 'development', 

    /* ソースマップの出力形式の指定 */
    devtool: 'inline-source-map',

    /* webpackがビルドを始める際の開始点となるファイルを指定 */
    entry: './src/index.tsx',

    /* バンドルファイルの出力先とファイル名を指定 */
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
      },

    /* webpackが特定のmoduleをどう扱うかの設定(JavaScript以外のリソースを読み込めるようにする) */
    module: {
        rules: [ 
            { // TypeScriptモジュールの設定
                test: [/\.ts$/, /\.tsx$/],
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            },
            { // cssモジュールの設定
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, // CSSファイルを書き出すオプションを有効にする
                  {
                    loader: 'css-loader',
                    options: { url: false }
                  },
                ],
            },
            { // 画像ファイルモジュールの設定
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: { 
                            name: '[name].[ext]',
                            outputPath : 'images/',
                        },
                    }, 
                ],
            },
        ]
    },

    /* webpackビルドプロセスをカスタマイズ */
    plugins: [ 
        /* htmlのテンプレートを指定 */
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/index.html"),
        }),
        /* バンドル後にcssファイルを出力 */
        new MiniCssExtractPlugin({　// 
            filename: 'css/style.css',
        })
    ],

    /* importにおける省略設定 */
    resolve: {
        modules: [path.resolve(__dirname, "node_modules")],
        extensions: [".ts", ".tsx", ".js"],
    },

    /* 特定の環境を指定してコンパイル */
    target: ["web", "es5"], // ES5(IE11等)向けの指定

    /* 開発用サーバの設定 */
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
          },
          port: 9000, // ポート番号の指定
        watchFiles: ['src/**/*'], // ファイルの変更があるたびに更新
      },
  };