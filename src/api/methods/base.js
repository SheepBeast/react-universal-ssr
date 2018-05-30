// @flow

import Axios from "axios";

type format = {
  data: {
    method: string,
    tokenId: string,
    data: Object
  },
  [string]: any
}

const initialConfig = {
  url: process.env.NODE_ENV === "production" ? __REMOTE_SERVER__ : __PROXY_SERVER__ ,
  // url: '/api',
  method: 'post',
  headers: {
    'Content-Type': 'text/json;charset=utf-8',
    'Content-Version': '1.2',
    'Content-Type': 'application/json'
  }
}

const base = (options: format): Promise => {
  const requestOptions = Object.assign({}, initialConfig, options)
  console.log('request options -->', requestOptions)
  return Axios(requestOptions)
}

export default base