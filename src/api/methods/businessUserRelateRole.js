// @flow

import base from './base'
import { BUSINESS_USER_RELATE_ROLE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userId: string,
  roleId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_USER_RELATE_ROLE, data, tokenId))