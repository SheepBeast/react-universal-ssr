// @flow

import base from './base'
import { BUSINESS_UPDATE_USER_INFO } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userPhoto?: string,
  userSex?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_USER_INFO, data, tokenId))