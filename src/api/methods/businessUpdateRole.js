// @flow

import base from './base'
import { BUSINESS_UPDATE_ROLE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId: string,
  roleName?: string,
  remark?: string,
  actionId?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_ROLE, data, tokenId))