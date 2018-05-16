// @flow

import base from './base'
import { BUSINESS_SEND_NEWS } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  newsId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_SEND_NEWS, data, tokenId))