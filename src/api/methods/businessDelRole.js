// @flow


import base from './base'
import { BUSINESS_DEL_ROLE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_DEL_ROLE, data, tokenId))