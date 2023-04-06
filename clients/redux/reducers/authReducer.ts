import { Action, authReducerState } from 'types'
import { AUTH_ACTION_TYPE } from '@redux/types/index'
import { SUCCESS, FAILURE, REQUEST } from '@redux/types'

const initialState: authReducerState = {
  userInfo: null,
  getUserInfoLoading: false
}

export const authReducer = (state = initialState, action: Action): authReducerState => {
  const { type, payload } = action || {}
  switch (type) {
    case REQUEST(AUTH_ACTION_TYPE.getUserInfo):
      return {
        ...state,
        getUserInfoLoading: true
      }
    case SUCCESS(AUTH_ACTION_TYPE.getUserInfo):
      return {
        ...state,
        userInfo: payload?.response,
        getUserInfoLoading: false
      }
    case FAILURE(AUTH_ACTION_TYPE.getUserInfo):
      return {
        ...state,
        userInfo: null,
        getUserInfoLoading: false
      }

    default:
      return state
  }
}
