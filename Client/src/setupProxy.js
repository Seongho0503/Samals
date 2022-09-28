const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: process.env.REACT_APP_API,
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
