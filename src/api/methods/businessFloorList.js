// @flow


import base from './base'
import { BUSINESS_FLOOR_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_FLOOR_LIST, data, tokenId))