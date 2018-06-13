// @flow


import base from './base'
import { BUSSINESS_REGISTER } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  accountName: string,
  password: string,
  phoneNo: string,
  code: string,
  lang?: 'zh' | 'en' | null,
  locale: 'CN' | 'US' | null
}

export default (data: format, tokenId: string, requestOptions: Object): Promise => base(createApiOptions(BUSSINESS_REGISTER, data, tokenId, requestOptions))