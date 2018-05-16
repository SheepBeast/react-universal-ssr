// @flow


import base from './base'
import { BUSINESS_LOCK_DETAIL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  lockId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_LOCK_DETAIL, data, tokenId))