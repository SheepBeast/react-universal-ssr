// @flow


import base from './base'
import { BUSSINESS_REGISTER } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userName: string,
  password: string,
  phoneNo: string,
  code: string,
  lang?: 'zh' | 'en',
  locale?: 'CN' | 'US'
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSSINESS_REGISTER, data, tokenId))