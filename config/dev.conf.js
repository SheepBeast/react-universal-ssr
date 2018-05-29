const proxyTable = {
  '/api': {
    target: 'https://t.server.wisbetter.com',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  },
  '/local': {
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite: {
      '^/local': ''
    }
  }
}

module.exports = {
  proxyTable
}