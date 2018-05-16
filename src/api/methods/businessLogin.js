// @flow


import base from './base'
import { BUSINESS_LOGIN } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userName: string,
  password: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_LOGIN, data, tokenId))