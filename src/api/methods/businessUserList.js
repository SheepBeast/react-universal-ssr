// @flow

import base from './base'
import { BUSINESS_USER_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roleId?: string,
  state?: 0 | 1 | 2,
  startNum?: number,
  getNum?: number
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_USER_LIST, data, tokenId))