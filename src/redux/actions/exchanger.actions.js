import { api } from "api/api"
import { exchangerConstants } from "redux/constants/index"
import { store } from "helpers/store"

export const exchangerActions = {
	handleInputChangeValue,
	handleDropdownChangeValue,
	exchangeValues,
	resetExchanger,
}

function handleInputChangeValue(type, value) {
	const invoiceId = store.getState().exchanger.invoice.id
	const withdrawId = store.getState().exchanger.withdraw.id

	return (dispatch) => {
		dispatch({
			type: exchangerConstants.SET_PAYMENT_INFO,
			payload: { type, ...value },
		})

		getValueFromApi(dispatch, type, value.value, invoiceId, withdrawId)
	}
}

function handleDropdownChangeValue(type, value) {
	const invoiceId = store.getState().exchanger.invoice.id
	const withdrawId = store.getState().exchanger.withdraw.id
	const valueForExchange = store.getState().exchanger[type].value

	return (dispatch) => {
		if (valueForExchange) {
			dispatch({
				type: exchangerConstants.SET_PAYMENT_INFO,
				payload: { type, ...value },
			})
			dispatch({
				type: exchangerConstants.SET_PAYMENT_INFO_ERROR,
				payload: { error: null },
			})

			getValueFromApi(dispatch, "invoice", valueForExchange, invoiceId, withdrawId)
		} else {
			dispatch({
				type: exchangerConstants.SET_PAYMENT_INFO,
				payload: { type, ...value },
			})
			// dispatch({
			// 	type: exchangerConstants.SET_PAYMENT_INFO_ERROR,
			// 	payload: { error: "provide at least one value" },
			// })
		}
	}
}

function getValueFromApi(dispatch, type, value, invoiceId, withdrawId) {
	// console.log("value :>> ", value)
	// console.log("invoiceId :>> ", invoiceId)
	// console.log("withdrawId :>> ", withdrawId)
	if (!value) {
		dispatch({
			type: exchangerConstants.SET_PAYMENT_INFO_ERROR,
			payload: { error: "provide at least one value" },
		})
		return
	}

	if (!invoiceId) {
		dispatch({
			type: exchangerConstants.SET_PAYMENT_INFO_ERROR,
			payload: { error: "pick sell field, pls" },
		})
		return
	}

	if (!withdrawId) {
		dispatch({
			type: exchangerConstants.SET_PAYMENT_INFO_ERROR,
			payload: { error: "pick buy field, pls" },
		})
		return
	}

	dispatch({
		type: exchangerConstants.CHANGED_VALUE_REQUEST,
	})

	api
		.get(
			`/payMethods/calculate?base=${type}&amount=${value}&invoicePayMethod=${invoiceId}&withdrawPayMethod=${withdrawId}`,
		)
		.then(
			(res) => {
				dispatch({
					type: exchangerConstants.CHANGED_VALUE_SUCCESS,
					payload: {
						type: type === "invoice" ? "withdraw" : "invoice",
						value: res.data.amount,
					},
				})

				dispatch({
					type: exchangerConstants.SET_PAYMENT_INFO_ALLOWED,
				})
			},
			(err) =>
				dispatch({
					type: exchangerConstants.CHANGED_VALUE_FAILURE,
					payload: { type, ...err.message },
				}),
		)
}

function exchangeValues() {
	const invoiceId = store.getState().exchanger.invoice.id
	const withdrawId = store.getState().exchanger.withdraw.id
	const valueForExchange = store.getState().exchanger["invoice"].value
	return (dispatch) => {
		dispatch(request())

		api
			.post(`/bids`, {
				base: "invoice",
				amount: valueForExchange,
				invoicePayMethod: invoiceId,
				withdrawPayMethod: withdrawId,
			})
			.then((res) => {
				// throw new Error("") //test purposes
				dispatch(success(res.data))
			})
			.catch((err) => dispatch(failure(err)))
	}

	function request() {
		return { type: exchangerConstants.POST_EXCHANGED_VALUES_REQUEST }
	}
	function success(responce) {
		return {
			type: exchangerConstants.POST_EXCHANGED_VALUES_SUCCESS,
			payload: { ...responce },
		}
	}
	function failure(error) {
		return {
			type: exchangerConstants.POST_EXCHANGED_VALUES_FAILURE,
			payload: { error },
		}
	}
}

function resetExchanger() {
	return {
		type: exchangerConstants.RESET_EXCHANGER,
	}
}
