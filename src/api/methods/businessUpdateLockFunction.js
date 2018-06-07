// @flow


import base from './base'
import { BUSINESS_UPDATE_lOCK_FUNCTION } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  lockId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_lOCK_FUNCTION, data, tokenId))