// @flow


import base from './base'
import { BUSINESS_FORGET_PASSWORD } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userName: string,
  phoneNo: string,
  code: string,
  password: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_FORGET_PASSWORD, data, tokenId, requestOptions))