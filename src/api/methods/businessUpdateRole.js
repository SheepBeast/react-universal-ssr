// @flow

import base from './base'
import { BUSINESS_UPDATE_ROLE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId: string,
  roleName?: string,
  remark?: string,
  actionId?: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_ROLE, data, tokenId))