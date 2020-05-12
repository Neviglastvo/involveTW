import { payMethodConstants } from "redux/constants/index"

const initialState = {
	loading: false,
	error: null,
	payMethods: null,
}

export function payMethod(state = initialState, action) {
	switch (action.type) {
		case payMethodConstants.GET_ALL_REQUEST:
			return {
				...state,
				loading: true,
			}
		case payMethodConstants.GET_ALL_SUCCESS:
			return {
				...state,
				loading: false,
				error: null,
				payMethods: action.payload,
			}
		case payMethodConstants.GET_ALL_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}
		default:
			return state
	}
}
