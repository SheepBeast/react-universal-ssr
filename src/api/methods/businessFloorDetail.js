// @flow


import base from './base'
import { BUSINESS_FLOOR_DETAIL } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  floorId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_FLOOR_DETAIL, data, tokenId))