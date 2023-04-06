import { REQUEST, SUCCESS, FAILURE, AUTH_ACTION_TYPE } from '@redux/types'
import { Action } from 'types'

export const getUserInfo = {
  request(): Action {
    return {
      type: REQUEST(AUTH_ACTION_TYPE.getUserInfo),
    }
  },
  success(userData: any): Action {
    return {
      type: SUCCESS(AUTH_ACTION_TYPE.getUserInfo),
      payload: {
        response: userData,
      },
    }
  },
  failure(error?: any): Action {
    return {
      error,
      type: FAILURE(AUTH_ACTION_TYPE.getUserInfo),
    }
  },
}
