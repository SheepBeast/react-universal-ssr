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
    'Content-Version': '1.2'
  }
}

const base = (data: format, tokenId: string): Promise => Axios(Object.assign({}, initialConfig, options))

export default base