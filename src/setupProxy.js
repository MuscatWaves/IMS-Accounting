const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://nice-lime-donkey-cuff.cyclic.app",
      changeOrigin: true,
    }),
    createProxyMiddleware("/files", {
      target: "https://cvparse.fra1.cdn.digitaloceanspaces.com/",
      changeOrigin: true,
    })
  );
};
