// @flow


import base from './base'
import { BUSINESS_LOCK_LOG_LIST } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  lockId: string,
  startNum?: number,
  getNum?: number
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_LOCK_LOG_LIST, data, tokenId))