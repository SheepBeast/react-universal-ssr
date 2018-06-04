// @flow

import base from './base'
import { BUSINESS_USER_RELATE_HOUSE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'


type format = {
  userId: string,
  houses: {
    [number]: {
      houseId: string,
      buildings?: {
        [number]: {
          buildingId: string,
          floors?: {
            [number]: {
              floorId: string,
              rooms?: {
                [number]: {
                  roomId: string
                }
              }
            }
          }
        }
      }
    }
  }
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_USER_RELATE_HOUSE, data, tokenId))