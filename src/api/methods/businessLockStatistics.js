// @flow


import base from './base'
import { BUSINESS_LOCK_STATISTICS } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_LOCK_STATISTICS, data, tokenId))