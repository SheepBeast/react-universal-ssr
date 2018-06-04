// @flow

import base from './base'
import { BUSINESS_UPDATE_BUILDING_INFO } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId: string,
  buildingName: string,
  provinceId?: number,
  cityId?: number,
  areaId?: number,
  area?: string,
  picUrl: string,
  picRemark: string,
  contact: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_BUILDING_INFO, data, tokenId))