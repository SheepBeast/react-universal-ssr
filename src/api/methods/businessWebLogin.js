// @flow


import base from './base'
import { BUSINESS_WEB_LOGIN } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  accountName: string,
  password: string
}

export default (data: format, tokenId: string, requestOptions: Object): Promise => base(createApiOptions(BUSINESS_WEB_LOGIN, data, tokenId, requestOptions))