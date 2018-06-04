// @flow


import base from './base'
import { BUSINESS_AUDIT_NEWS } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  newsId: string,
  audit: 1 | 2,
  auditRemark?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_AUDIT_NEWS, data, tokenId))