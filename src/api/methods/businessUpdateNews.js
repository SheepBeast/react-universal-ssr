// @flow

import base from './base'
import { BUSINESS_UPDATE_NEWS } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  newsId: string,
  newsTitle: string,
  pushType: number,
  pushTo: 1 | 2,
  newsLogo: string,
  newsAbstract: string,
  newsContent: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_NEWS, data, tokenId))