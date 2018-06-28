var crypto = require('crypto')
var NodeRSA = require('node-rsa')

var publicKey = require('../pem/rsa_public_key.pem')

var rsaKey = new NodeRSA(publicKey, 'pkcs8-public-pem')

rsaKey.setOptions({
  encryptionScheme: 'pkcs1',
  signingScheme: 'pkcs1',
  mode: 'ecb'
})

var encrypt = {
  md5: text => {
    var md5 = crypto.createHash('md5')

    md5.update(text)

    var md5Sign = md5.digest('hex').toUpperCase()

    console.log('md5 -->', md5Sign)

    return md5Sign
  },

  rsa: text => {
    var encrypted = rsaKey.encrypt(text, 'base64')

    console.log('rsa -->', encrypted)

    return encrypted
  }
}

module.exports = encrypt