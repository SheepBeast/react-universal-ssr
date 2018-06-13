// @flow


import base from './base'
import { BUSINESS_GATEWAY_DELETE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  deviceType: number,
  deviceId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_GATEWAY_DELETE, data, tokenId))