import { combineReducers } from "redux"
import { payMethod } from "redux/reducers/index"
import { exchanger } from "redux/reducers/index"

export const rootReducer = combineReducers({
	payMethod,
	exchanger,
})
