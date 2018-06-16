// @flow


import base from './base'
import { BUSINESS_MODIFY_USER } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userId: string,
  userName?: string,
  phoneNo?: string,
  userSex?: number,
  remark?: string,
  roleId?: string,
  eMail?: string,
  roleId?: string,
  houses?: {
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

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_MODIFY_USER, data, tokenId))