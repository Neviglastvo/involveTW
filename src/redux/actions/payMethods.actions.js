import { api } from "api/api"
import { payMethodConstants } from "redux/constants/index"

export const payMethodsActions = {
	getAllPayMethods,
}

function getAllPayMethods() {
	return (dispatch) => {
		dispatch(request())

		api.get("/payMethods").then(
			(res) => {
				// setTimeout(() => {
				dispatch(success(res.data))
				// throw new Error("NOT!")
				// }, 500)
			},
			(err) => dispatch(failure(err)),
		)
	}

	function request() {
		return { type: payMethodConstants.GET_ALL_REQUEST }
	}
	function success(payMethods) {
		return {
			type: payMethodConstants.GET_ALL_SUCCESS,
			payload: { ...payMethods },
		}
	}
	function failure(error) {
		return {
			type: payMethodConstants.GET_ALL_FAILURE,
			payload: { error },
		}
	}
}
