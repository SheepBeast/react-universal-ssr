// @flow


import base from './base'
import { BUSINESS_GATEWAY_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  state: 0 | 1 | null,
  findName: string,
  startNum: number,
  getNum: number
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_GATEWAY_LIST, data, tokenId))