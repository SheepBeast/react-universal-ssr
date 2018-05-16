// @flow


import base from './base'
import { BUSINESS_FORGET_PASSWORD } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userName: string,
  phoneNo: string,
  code: string,
  password: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_FORGET_PASSWORD, data, tokenId))