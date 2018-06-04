// @flow


import base from './base'
import { BUSINESS_ADD_TENANT } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  tenantName: string,
  sex: 1 | 2,
  phoneNo: string,
  credentialType: 0 | 1 | 2 | 3 | 4,
  credentialNum: string,
  remark?: string,
  roomId?: string,
  beginDate?: string,
  endDate?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ADD_TENANT, data, tokenId))