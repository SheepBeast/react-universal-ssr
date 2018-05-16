// @flow


import base from './base'
import { BUSINESS_ENABLE_USER } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userId: string,
  state: 0 | 1
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ENABLE_USER, data, tokenId))