// @flow


import base from './base'
import { BUSINESS_ADD_ROOM_LABEL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  labelName: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ADD_ROOM_LABEL, data, tokenId))