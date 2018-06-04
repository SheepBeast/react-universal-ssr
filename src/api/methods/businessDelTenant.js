// @flow


import base from './base'
import { BUSINESS_DEL_TENANT } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  tenantId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_DEL_TENANT, data, tokenId))