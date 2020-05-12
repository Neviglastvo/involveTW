import { exchangerConstants } from "redux/constants/index"

const initialState = {
	loading: false,
	error: null,
	success: null,
	allowedToExchange: false,
	invoice: { id: null, name: null, value: "" },
	withdraw: { id: null, name: null, value: "" },
}

export function exchanger(state = initialState, action) {
	switch (action.type) {
		case exchangerConstants.SET_PAYMENT_INFO:
			return {
				...state,
				[action.payload.type]: { ...state[action.payload.type], ...action.payload },
			}
		case exchangerConstants.SET_PAYMENT_INFO_ERROR:
			return {
				...state,
				error: action.payload.error,
			}
		case exchangerConstants.SET_PAYMENT_INFO_ALLOWED:
			return {
				...state,
				error: null,
				allowedToExchange: true,
			}

		case exchangerConstants.CHANGED_VALUE_REQUEST:
			return {
				...state,
				loading: true,
			}
		case exchangerConstants.CHANGED_VALUE_SUCCESS:
			return {
				...state,
				loading: false,
				[action.payload.type]: { ...state[action.payload.type], ...action.payload },
			}
		case exchangerConstants.CHANGED_VALUE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.error,
			}

		case exchangerConstants.POST_EXCHANGED_VALUES_REQUEST:
			return {
				...state,
				loading: true,
			}
		case exchangerConstants.POST_EXCHANGED_VALUES_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				message: action.payload,
			}
		case exchangerConstants.POST_EXCHANGED_VALUES_FAILURE:
			return {
				...state,
				loading: false,
				success: false,
				error: action.error,
			}

		case exchangerConstants.RESET_EXCHANGER:
			return initialState

		default:
			return state
	}
}
