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
  url: 'https://t.server.wisbetter.com',
  method: 'post',
  headers: {
    'Content-Type': 'text/json;charset=utf-8',
    'Content-Version': '1.2',
    'Content-Type': 'application/json'
  }
}

const base = (options: format): Promise => {
  const requestOptions = Object.assign({}, initialConfig, options)
  return Axios(requestOptions)
}

export default base