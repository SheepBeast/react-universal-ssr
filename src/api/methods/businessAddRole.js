// @flow


import base from './base'
import { BUSINESS_ADD_ROLE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = null

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ADD_ROLE, data, tokenId))