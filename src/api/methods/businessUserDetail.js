// @flow

import base from './base'
import { BUSINESS_USER_DETAIL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_USER_DETAIL, data, tokenId))