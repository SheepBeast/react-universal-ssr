// @flow


import base from './base'
import { BUSINESS_DYNAMIC_INFO_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_DYNAMIC_INFO_LIST, data, tokenId))