// @flow

import base from './base'
import { BUSINESS_UPDATE_BIND_PHONE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  phoneNo: string,
  code: string,
  type: 1 | 2
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_BIND_PHONE, data, tokenId))