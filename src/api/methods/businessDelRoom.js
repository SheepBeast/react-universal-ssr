// @flow


import base from './base'
import { BUSINESS_DEL_ROOM } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  id: string,
  level: number
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_DEL_ROOM, data, tokenId))