import thunk from 'redux-thunk'
import { createWrapper } from 'next-redux-wrapper'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '@redux/combineReducers'

/**
 * @param {object} initialState
 */
export const makeStore = (initialState: any) => {

  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
}

export const wrapper = createWrapper(makeStore, { debug: false });
