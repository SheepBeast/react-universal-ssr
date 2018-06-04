// @flow


import base from './base'
import { BUSINESS_DEL_AUTH } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  authId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_DEL_AUTH, data, tokenId))