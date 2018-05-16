// @flow


import base from './base'
import { BUSINESS_RESET_PASSWORD } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_RESET_PASSWORD, data, tokenId))