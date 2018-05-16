// @flow


import base from './base'
import { BUSINESS_DEVICE_STATICSTICS } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_DEVICE_STATICSTICS, data, tokenId))