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
      "clientPort":JSON.stringify( 8080),
      "catalogHost":JSON.stringify( "/catalog_admin/index.html#/uploads"),
      "monolithHost":JSON.stringify( "https://qas16.bigbasket.com"),
      "grootHost":JSON.stringify( "/content-svc/apluscontent"),
      "partnerLogoutUrl":JSON.stringify( "/partner/marketeer/tpv_dashboard/"),
      "AuthKey":JSON.stringify( "Authorization"),
      "ttl":JSON.stringify( 24),  
      "debug":JSON.stringify( true),  
      "BasicAuthVal":JSON.stringify( ""),
      "statusDraft":JSON.stringify( "cms_contentDrafted"),
      "statusRevision":JSON.stringify( "cms_contentSentForReview"),
      "statusReview":JSON.stringify( "cms_contentCreated"),
      "statusActive":JSON.stringify( "cms_contentActive"),
      "statusInactive":JSON.stringify( "cms_contentInActive"),
      "statusSentForPublish":JSON.stringify( "cms_contentSentForPublish"),
      "statusPending":JSON.stringify( "cms_contentPending"),
      "creatorPermission":JSON.stringify( "cmsCreators"),
      "reviewerPermission":JSON.stringify( "cmsReviewers"),
      "publisherPermission":JSON.stringify( "cmsPublishers"),
      "unpublisherPermission":JSON.stringify( "cmsUnPublishers"),
      "imageSize":JSON.stringify( 1048576),   //1024*1024 = 1MB
      "FroalaKey":JSON.stringify( "lA5B4C3D1uF2C1F1H2A10C1B5A1D6C4hwJ-7pzxipyiB2G-7ol=="),
      "signKey":JSON.stringify( ""),
      "timeout":JSON.stringify( 1500),
      "pendingTimeout":JSON.stringify( 30000),
      "pageListSize":JSON.stringify( ""),
      "imageDomain":JSON.stringify("https://www.bigbasket.com"),
      "templateAPI" :JSON.stringify("/content-svc/templates"),
      "getGroupUserUrl":JSON.stringify( "/api/get-group-users/"),
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