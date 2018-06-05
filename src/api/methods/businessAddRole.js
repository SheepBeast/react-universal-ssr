// @flow


import base from './base'
import { BUSINESS_ADD_ROLE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleName: string,
  remark?: string,
  actionId?: "1" | "2" | "3"
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ADD_ROLE, data, tokenId))