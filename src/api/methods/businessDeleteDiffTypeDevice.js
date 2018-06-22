// @flow


import base from './base'
import { BUSINESS_DELETE_DIFF_TYPE_DEVICE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  list: {
    [number]: {
      deviceType: number,
      deviceId: string
    }
  }
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_DELETE_DIFF_TYPE_DEVICE, data, tokenId))