import { connect } from 'react-redux'
import React, { useEffect } from 'react'

import { getAllDataUserThunkAction } from '@redux/thunks/authThunks'

type LoginPageTypes = {
  getUserData(): Promise<void>
  userInfo: any
}

const LoginPage: React.FC<LoginPageTypes> = (props) => {
  const { getUserData, userInfo } = props || {}
  useEffect(() => {
    getUserData()
  }, [])

  return <div>This is login page</div>
}
const mapDispatchToProps = (dispatch: any) => ({
  getUserData: () => dispatch(getAllDataUserThunkAction()),
})

const mapStateToProps = (state: any) => ({
  userInfo: state.authReducer.userInfo,
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default withConnect(LoginPage)
