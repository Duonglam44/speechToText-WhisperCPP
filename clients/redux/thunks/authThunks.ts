import { getUserInfo } from '@redux/actions'

export const getAllDataUserThunkAction = () => async (dispatch: any) => {
  dispatch(getUserInfo.request())

  try {
    await dispatch(getUserInfo.success({
      name: 'lam',
      age: '22'
    }))
  } catch (error: any) {
    dispatch(getUserInfo.failure())
  }
}
