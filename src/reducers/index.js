'use strict'
import { combineReducers } from 'redux'
// import { reducer as formReducer } from 'redux-form'

import problems from './problems'

const rootReducer = combineReducers({
  problems
  // form: formReducer
})

export default rootReducer
