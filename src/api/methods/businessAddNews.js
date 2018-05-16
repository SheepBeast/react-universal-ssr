// @flow


import base from './base'
import { BUSINESS_ADD_NEWS } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  newsTitle: string,
  pushType: number,
  pushTo: number,
  newsLogo: string,
  newsAbstract: string,
  newsContent: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ADD_NEWS, data, tokenId))