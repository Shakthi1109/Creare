const withImages = require("next-images");
module.exports = withImages({
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
});


// const withImages = require('next-images')
// module.exports = withImages({})

// module.exports = {
//   webpackDevMiddleware: (config) => {
//     config.watchOptions.poll = 300;
//     return config;
//   },
// };


// const withImages = require('next-images')
// module.exports = withImages({})
//   webpack(config, options) {
//     return config
//   }
// })