// @flow

import base from './base'
import { BUSINESS_UPDATE_BIND_PHONE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  phoneNo: string,
  code: string,
  type: 1 | 2
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_BIND_PHONE, data, tokenId))