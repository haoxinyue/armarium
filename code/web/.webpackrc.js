const path = require('path');

export default {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },

  commons: [
    // {
    //   name: "common",
    //   async: "common-in-lazy",
    //   children: true,
    //   minChunks: ({ resource } = {}) => {
    //     console.log(resource);
    //     return resource &&
    //     resource.includes('node_modules') &&
    //       /(BizCharts|data-set)/.test(resource)
    //   }
    // },
    // {
    //   //自动化分离 vendor
    //   name:"vendor",
    //   async: '__common',
    //   children: true,
    //   minChunks({resource}, count) {
    //     return   resource &&
    //       resource.indexOf('node_modules') >= 0 &&
    //       resource.match(/\.js$/)
    //   },
    // },
    {
      name: 'app',
      children: true,
      async: 'used-twice',
      minChunks: (module, count) => {
        return count >= 2;
      },
    },
  ],
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: false,
  publicPath: '/',
  hash: true,
  proxy: {
    '/MAPI': {
      target: 'http://47.100.198.255:8080/',
      changeOrigin: true,
      pathRewrite: { '^/MAPI': '' },
    },
  },
};
