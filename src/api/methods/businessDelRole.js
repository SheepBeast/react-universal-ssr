// @flow


import base from './base'
import { BUSINESS_DEL_ROLE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_DEL_ROLE, data, tokenId))