// @flow

import base from './base'
import { BUSINESS_UPDATE_FLOOR_INFO } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  floorId: string,
  floorName: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_FLOOR_INFO, data, tokenId))