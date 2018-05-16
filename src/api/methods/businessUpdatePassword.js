// @flow

import base from './base'
import { BUSINESS_UPDATE_PASSWORD } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  oldPassword: string,
  newPassword: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_PASSWORD, data, tokenId))