// @flow

import base from './base'
import { BUSINESS_UPDATE_USER_INFO } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userPhoto?: string,
  userSex?: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_USER_INFO, data, tokenId))