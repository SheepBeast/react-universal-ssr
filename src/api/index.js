import methodTypes, { BUSSINESS_REGISTER, APP_SMS_INFO, BUSINESS_LOGIN, BUSINESS_FORGET_PASSWORD } from '../constants/method-types'

let proto = {}, needLogin = {}, method

// 不需要登陆的操作
const notNeedLogin = {
  BUSSINESS_REGISTER: false,
  APP_SMS_INFO: false,
  BUSINESS_LOGIN: false,
  BUSINESS_FORGET_PASSWORD: false
}

for (method in methodTypes) {
  needLogin[method] = true
  proto[method] = require(`./methods/${method}.js`).default
}


const createLoginReferrer = () => Object.assign({}, needLogin, notNeedLogin)

// 合并操作的使用规则（是否需要登陆）
proto.loginReferrer = createLoginReferrer()

// 用于执行其他操作的函数
proto.fetch = function (method, params, requestOptions) {
  if (this.loginReferrer[method] && !this.tokenId) {
    return {
      code: -1,
      detail: '请先登陆'
    }
  }

  if (!this.__proto__[method]) {
    this.__proto__[method] = require(`./methods/${method}`).default
  }

  return this[method].call(this, params, this.tokenId, requestOptions)
}

// API类
class API { }

API.prototype = proto

export default API

let api = new API()

export {
  api
}