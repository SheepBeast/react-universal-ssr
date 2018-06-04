// @flow


import base from './base'
import { BUSINESS_LOGOUT } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_LOGOUT, data, tokenId))