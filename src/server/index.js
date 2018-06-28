require('babel-register')

var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var qiniu = require('qiniu')
var multer = require('multer')
var stream = require('stream')

var encrypt = require('./encrypt')

var accessKey = 'X4Qsl87R_XSqoor72ylgLcCUReI_FprRD-UMycMH'
var secretKey = 'Q2pgyyHo2WuHueS6B9CzbfUlEX2jvxJ6TnPZDlui'
var bucketName = 'sweethomerelease'

// var React = require('react')
// var { renderToString } = require('react-dom/server')
// var { StaticRouter } = require('react-router-dom')

// var configureStore = require('../store').default
// var App = require('../pages/App/index').default


var API = require('../api').default

var server = express()
var api = new API()

var upload = multer()

// var config = new qiniu.conf.Config()
// config.zone = qiniu.zone.Zone_z0
var formUploader = new qiniu.form_up.FormUploader(/* config */)


server.set('views', __views)
server.set('view engine', 'ejs')

var contentTypes = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpg'
}


server.use(require('morgan')('dev', {
  skip: function (req, res) {
    return res.statusCode < 400
  }
}))

// 跨域设置
server.all('/upload', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

server.use(bodyParser.urlencoded({ extended: false }))

server.use(bodyParser.json())

server.use('/assets', express.static(__assets, {
  dotfiles: 'ignore',
  etag: true,
  extensions: ['html', 'css', 'png', 'jpg', 'js'],
  maxAge: '3600000',
  redirect: true,
  setHeaders: function (res, pathname, stat) {
    res.set('x-timestamp', Date.now())
    res.set('Vary', 'Accept-Encoding')
    res.set('Cache-Control', 'assets, max-age=3600')

    var ext = path.extname(pathname)
    res.set('Content-Type', contentTypes[ext])
  }
}))

// server.get('/', function (req, res) {
//   var html = renderToString(
//     <StaticRouter location={req.url} context={{}}>
//       <App />
//     </StaticRouter>
//   )
//   var store = configureStore()

//   // console.log('req url -->', req.url, html)

//   res.render('index', { html, state: store.getState() })
// })


var commons_middleware = (req, res, next) => {
  var { method, data: { accountName, password, phoneNo, code } } = req.body

  var md5_cipher = encrypt.md5(password)
  var rsa_cipher = encrypt.rsa(md5_cipher)

  api.fetch(method, { accountName, password: rsa_cipher, phoneNo, code }, {
    url: __REMOTE_SERVER__
  })
    .then(ret => {
      console.log('ret -->', ret.data)
      res.send(ret.data)
    })
    .catch(err => {
      console.log('err -->', err)
      res.send(err)
    })
}

server.post('/login', commons_middleware)
server.post('/register', commons_middleware)
server.post('/forget-password', commons_middleware)

server.post('/modify-password', function (req, res, next) {
  console.log('modify password ------------------------------>')
  let {
    method,
    tokenId,
    data: {
      oldPassword,
      newPassword
    }
  } = req.body

  var md5_old_password = encrypt.md5(oldPassword)
  var md5_new_password = encrypt.md5(newPassword)

  api.tokenId = tokenId

  console.log('md5 -->', md5_old_password, md5_new_password)

  api.fetch(method, { oldPassword: md5_old_password, newPassword: md5_new_password }, { url: __REMOTE_SERVER__ })
    .then(ret => {
      console.log('ret -->', ret.data)
      res.send(ret.data)
    })
    .catch(err => {
      console.log('err -->', err)
      res.send(err)
    })
})

server.post('/user-add', function (req, res, next) {
  let {
    method,
    tokenId,
    data: {
      userAccount,
      userName,
      phoneNo,
      password,
      eMail,
      roleId,
      houses
    }
  } = req.body

  var md5_cipher = encrypt.md5(password)
  var rsa_cipher = encrypt.rsa(md5_cipher)

  api.tokenId = tokenId
  var ret = api.fetch(method, {
    userAccount,
    userName,
    phoneNo,
    password: rsa_cipher,
    eMail,
    roleId,
    houses
  }, {
      url: __REMOTE_SERVER__
    })
    .then(ret => {
      console.log('ret -->', ret.data)
      res.send(ret.data)
    })
    .catch(err => {
      console.log('err -->', err)
      res.send(err)
    })
})


function uptoken(key) {
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  var options = {
    scope: bucketName + ':' + key
  }

  var putPolicy = new qiniu.rs.PutPolicy(options)
  var uploadToken = putPolicy.uploadToken(mac)

  return uploadToken
}




server.post('/upload', upload.array('avatar'), function (req, res) {
  console.log('res header -->', req.files)

  var files = req.files, file = files[0]

  if (!(Array.isArray(files) && file && file.buffer)) {
    res.send({
      code: -1,
      msg: '没有可读的数据流'
    })
    return
  }

  var key = file.originalname + '.' + Date.now().toString()

  var bufferStream = new stream.PassThrough()
  bufferStream.end(files[0].buffer)

  var putExtra = new qiniu.form_up.PutExtra()

  formUploader.putStream(uptoken(key), key, bufferStream, putExtra, function (respErr, respBody, respInfo) {
    var data = {}
    if (respErr) {
      console.log('respErr -->', respErr)
      data = {
        resultCode: -2,
        msg: '上传失败',
        err: respErr
      }
    } else {
      if (respInfo.statusCode == 200) {
        console.log('respBody -->', respBody)
        data = {
          resultCode: 0,
          msg: '上传成功',
          picUrl: `https://file.wisbetter.com/${key}`
        }
      } else {
        console.log('respInfo.statusCode -->', respInfo.statusCode)
        console.log('respBody else -->', respBody)

        data = {
          resultCode: -3,
          msg: '上传失败',
          info: respInfo,
          err: respBody
        }
      }
    }
    res.send({ data })
  })
})

var port = process.env.NODE_ENV === "production" ? 1501 : 8081

server.listen(port, function () {
  console.log('Listenning on port: ' + port)
})