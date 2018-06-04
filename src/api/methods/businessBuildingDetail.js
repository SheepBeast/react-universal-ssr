// @flow


import base from './base'
import { BUSINESS_BUILDING_DETAIL } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_BUILDING_DETAIL, data, tokenId))