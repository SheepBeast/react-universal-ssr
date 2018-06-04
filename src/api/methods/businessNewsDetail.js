// @flow


import base from './base'
import { BUSINESS_NEWS_DETAIL } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  newsId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_NEWS_DETAIL, data, tokenId))