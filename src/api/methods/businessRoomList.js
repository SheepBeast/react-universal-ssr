// @flow

import base from './base'
import { BUSINESS_ROOM_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  houseId: string,
  buildingId?: string,
  floorId?: string,
  startNum?: number,
  getNum?: number
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ROOM_LIST, data, tokenId))