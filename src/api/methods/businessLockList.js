// @flow


import base from './base'
import { BUSINESS_LOCK_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  floorId: string,
  buildingId: string,
  houseId: string,
  mac?: string,
  startNum?: number,
  getNum?: number
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_LOCK_LIST, data, tokenId))