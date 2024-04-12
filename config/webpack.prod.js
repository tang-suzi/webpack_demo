const path = require("path");
const ESLintPligin = require("eslint-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

function getStyleLoader(pre) {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
}

module.exports = {
  // 模式
  mode: "production", // 开发模式
  //   mode: "production", // 生产模式
  // 入口
  entry: "./src/main.js", // 相对路径
  // 出口
  output: {
    // __dirname 代表当前文件夹目录
    path: path.resolve(__dirname, "../dist"), // 绝对路径
    // 入口文件打包输出文件名
    filename: "static/js/main.js",
    clean: true, // 清空dist文件夹
  },
  // 加载器
  module: {
    rules: [
      // loader配置
      // use执行顺序： 从后向前
      {
        test: /\.css$/,
        use: getStyleLoader(),
      },
      {
        test: /\.less$/i,
        use: getStyleLoader("less-loader"),
      },
      {
        test: /\.s[ac]ss$/i,
        use: getStyleLoader("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoader("stylus-loader"),
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
    new MiniCssExtractPlugin({
      filename: "static/css/main.css",
    }),
    new CssMinimizerPlugin()
  ],
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
  },
};
