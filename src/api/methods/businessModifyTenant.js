// @flow


import base from './base'
import { BUSINESS_MODIFY_TENANT } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  tenantId: string,
  tenantName?: string,
  sex?: number,
  phoneNo?: string,
  remark?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_MODIFY_TENANT, data, tokenId))