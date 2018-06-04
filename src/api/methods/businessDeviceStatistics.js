// @flow


import base from './base'
import { BUSINESS_DEVICE_STATICSTICS } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_DEVICE_STATICSTICS, data, tokenId))