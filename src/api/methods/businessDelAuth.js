// @flow


import base from './base'
import { BUSINESS_DEL_AUTH } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  authId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_DEL_AUTH, data, tokenId))