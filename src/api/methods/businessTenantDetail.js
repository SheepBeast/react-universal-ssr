// @flow

import base from './base'
import { BUSINESS_TENANT_DETAIL } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  tenantId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_TENANT_DETAIL, data, tokenId))