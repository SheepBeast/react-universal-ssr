// @flow


import base from './base'
import { BUSINESS_ROLE_LIST } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ROLE_LIST, data, tokenId))