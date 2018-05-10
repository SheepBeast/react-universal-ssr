const proxyTable = {
  '/api': {
    target: 'https://t.server.wisbetter.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
}

module.exports = {
  proxyTable
}