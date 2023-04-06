// all reducers no need to export with default option
import { combineReducers } from 'redux'
import { authReducer } from '@redux/reducers/authReducer'

const rootReducer = combineReducers({
  authReducer
})

export default rootReducer
// type of combine reducer
export type RootState = ReturnType<typeof rootReducer>
