// @flow


import base from './base'
import { BUSINESS_ROOM_DEVICE_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ROOM_DEVICE_LIST, data, tokenId))