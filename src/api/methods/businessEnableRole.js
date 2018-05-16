// @flow


import base from './base'
import { BUSINESS_ENABLE_ROLE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId: string,
  state?: 0 | 1
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ENABLE_ROLE, data, tokenId))