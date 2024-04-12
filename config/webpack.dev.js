const path = require("path");
const ESLintPligin = require("eslint-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 模式
  mode: "development", // 开发模式
  devtool: "source-map", // 源码映射
  // 入口
  entry: "./src/main.js", // 相对路径
  // 出口
  output: {
    // __dirname 代表当前文件夹目录
    // path: path.resolve(__dirname, "../dist"), // 绝对路径
    path: undefined,
    // 入口文件打包输出文件名
    filename: "static/js/main.js",
    clean: true, // 清空dist文件夹
  },
  // 加载器
  module: {
    rules: [
      // loader配置
      // use执行顺序： 从后向前
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          // "style-loader",
          MiniCssExtractPlugin.loader,
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        // 自定义文件名称，默认是hash值，如果不想hash值，可以设置为none
        generator: {
          filename: "static/images/[hash:10][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash:10][ext][query]",
        },
      },
      // 处理其他资源
      {
        test: /\.(mp3|mp4|avi)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:10][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules文件夹
        use: {
          loader: "babel-loader",
          // options: {
          //   presets: ["@babel/preset-env"],
          // },
        },
      },
    ],
  },
  // 插件
  plugins: [
    // 插件的配置
    // new ESLintPligin({
    //   context: path.resolve(__dirname, "src"),
    // }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    hot: true, // 开启热更新(只用于开发环境)
  },
};
