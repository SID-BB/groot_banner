const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  name: 'client',
  mode: 'development',
  target: "web",
  performance: {
    hints: false,
  },
  devtool: "inline-source-map",
  entry: {
    index: [
        "webpack-hot-middleware/client?path=http://localhost:8080/content-svc/apluscontent/__webpack_hmr",
        "react-hot-loader/patch",
        "./src/index.js"
    ]
  },
  output: {
    path: path.join(__dirname, "/dev"),
    chunkFilename: "[name].[hash].js",
    filename: "[name].[hash].js",
    publicPath: 'http://localhost:8080/content-svc/apluscontent/',
  },
  
module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(svg|gif|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
       use: "url-loader?limit=1000&mimetype=image/svg+xml&name=images/[name].[hash].[ext]"
        
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["url-loader"]
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              localIdentName: "[local]"
            }
          }
        ]
      }
    ]
},
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),

    new webpack.DefinePlugin({
      "catalogHost": JSON.stringify(process.env.CATALOG_HOST),
      "grootHost": JSON.stringify(process.env.GROOT_HOST),
      "partnerLogoutUrl": JSON.stringify(process.env.PARTNER_LOGOUT_URL),
      "AuthKey": JSON.stringify(process.env.AUTH_KEY),
      "ttl": JSON.stringify(process.env.TTL),
      "debug": JSON.stringify(process.env.DEBUG),
      "statusDraft": JSON.stringify(process.env.STATUS_DRAFT),
      "statusRevision": JSON.stringify(process.env.STATUS_REVISION),
      "statusReview": JSON.stringify(process.env.STATUS_REVIEW),
      "statusActive": JSON.stringify(process.env.STATUS_ACTIVE),
      "statusInactive": JSON.stringify(process.env.STATUS_INACTIVE),
      "statusSentForPublish": JSON.stringify(process.env.STATUS_SENT_FOR_PUBLISH),
      "statusPending": JSON.stringify(process.env.STATUS_PENDING),
      "creatorPermission": JSON.stringify(process.env.CREATOR_PERMISSION),
      "reviewerPermission": JSON.stringify(process.env.REVIEWER_PERMISSION),
      "publisherPermission": JSON.stringify(process.env.PUBLISHER_PERMISSION),
      "unpublisherPermission": JSON.stringify(process.env.UNPUBLISHER_PERMISSION),
      "imageSize": JSON.stringify(process.env.IMAGE_SIZE),   //1024*1024 = 1MB
      "FroalaKey": JSON.stringify(process.env.FROALA_KEY),
      "timeout": JSON.stringify(process.env.TIMEOUT),
      "pendingTimeout": JSON.stringify(process.env.PENDING_TIMEOUT),
      "imageDomain": JSON.stringify(process.env.IMAGE_DOMAIN),
      "templateAPI": JSON.stringify(process.env.TEMPLATE_API),
      "getGroupUserUrl": JSON.stringify(process.env.GET_GROUP_USER_URL)
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html'
    }),

    new ExtractCssChunks({
      filename: "[name].[hash].css",
      chunkFilename: "[name].[hash].css",
    }),

    new OptimizeCssAssetsPlugin(),

    new webpack.HotModuleReplacementPlugin(),
    
    //new BundleAnalyzerPlugin()
  ]

};