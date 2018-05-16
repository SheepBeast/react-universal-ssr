// @flow

import base from './base'
import { APP_SMS_INFO } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  flag: 1 | 2 | 3 | 4 | 5 | 6 | 7,
  phoneNo: string,
  lang?: 'zh' | 'en',
  locale?: 'CN' | 'US'
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(APP_SMS_INFO, data, tokenId))