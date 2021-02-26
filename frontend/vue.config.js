process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  pages: {
    index: {
      // entry for the page
      entry: "src/main.ts",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: process.env.VUE_APP_TITLE,
      theme_color: "#44b8b5",
      locale: process.env.VUE_APP_I18N_LOCALE,
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
  },

  transpileDependencies: ["vuetify"],

  pluginOptions: {
    i18n: {
      locale: "pt-BR",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: true
    },
    moment: {
      locales: ["pt-br", "en"]
    }
  },

  pwa: {
    name: process.env.VUE_APP_TITLE,
    theme_color: "#44b8b5",
    display: "fullscreen"
  },

  // indexPath: '../../../resources/views/frontend.blade.php',
  // outputDir: '../../../public/frontend',
  publicPath: process.env.VUE_APP_BASE_URL || "/"
  // indexPath: process.env.VUE_APP_INDEX_PATH || "index.html"
  // publicPath: '/',
  // assetsDir: '',
};
