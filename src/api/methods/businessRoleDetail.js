// @flow


import base from './base'
import { BUSINESS_ROLE_DETAIL } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ROLE_DETAIL, data, tokenId))