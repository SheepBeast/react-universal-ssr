// @flow

import base from './base'
import { BUSINESS_USER_RELATE_ROLE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userId: string,
  roleId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_USER_RELATE_ROLE, data, tokenId))