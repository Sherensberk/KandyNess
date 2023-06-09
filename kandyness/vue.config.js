const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    resolve: {
      fallback: {
        fs: false,
        net: false,
        crypto: false,
        tls: false,
      },
    },
  },
});
