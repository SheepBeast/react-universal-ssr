// @flow


import base from './base'
import { RELEASE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  lockId: string,
  releaseType: 255 | 1 | 2 | 7 | 12 | 14 | 15 | 16 | 17 | 18 | 20 | 21 | 22 | 23 | 24
}

export default (data: format, tokenId: string, requestOptions: Object): Promise => base(createApiOptions(RELEASE, data, tokenId, requestOptions))