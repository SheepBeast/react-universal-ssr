// @flow


import base from './base'
import { BUSINESS_ADD_USER } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  userName: string,
  phoneNo: string,
  password: string,
  userSex: number,
  remark?: string,
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

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ADD_USER, data, tokenId))