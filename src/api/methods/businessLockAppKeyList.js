// @flow


import base from './base'
import { BUSINESS_LOCK_APP_KEY_LIST } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  lockId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_LOCK_APP_KEY_LIST, data, tokenId))