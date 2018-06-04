// @flow


import base from './base'
import { BUSINESS_ADD_HOUSE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  houseName: string,
  houseType: 1 | 2 | 3 | 4 | 5 | 6,
  logoUrl?: string,
  adUrl?: string,
  publicityUrl?: string,
  remark?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ADD_HOUSE , data, tokenId))