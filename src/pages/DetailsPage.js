import classNames from "classnames"
import Loader from "components/Loader"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { exchangerActions } from "redux/actions"

export const DetailsPage = ({ location }) => {
	console.log("location", location)

	let history = useHistory()

	const dispatch = useDispatch()

	const exchanger = useSelector((state) => state.exchanger)
	const exchangerLoading = exchanger.loading
	const exchangerSuccess = exchanger.success
	// const exchangerError = exchanger.error
	const exchangerAllowedToExchange = exchanger.allowedToExchange

	const exchangerInvoiceName = exchanger.invoice.name
	const exchangerInvoiceValue = exchanger.invoice.value

	const exchangerWidthdrawName = exchanger.withdraw.name
	const exchangerWidthdrawValue = exchanger.withdraw.value

	const confirmActionHandler = () => {
		dispatch(exchangerActions.exchangeValues())
	}

	useEffect(() => {
		!exchangerAllowedToExchange && history.push("/")
	}, [exchangerAllowedToExchange, history])

	useEffect(() => {
		console.log("exchangerSuccess :>> ", exchangerSuccess)
		if (exchangerSuccess === false) {
			history.push("/error")
			return
		} else if (exchangerSuccess === true) {
			history.push("/success")
			return
		}
	}, [exchangerSuccess, history])

	return (
		<div
			className={classNames("exchanger exchanger--small exchanger--column", {
				loading: exchangerLoading === true,
			})}
		>
			<div className="exchanger__col">
				<div className="exchanger__title">Details</div>
			</div>

			<div className="exchanger__row">
				<div className="exchanger__row-title">Sell</div>
				<div className="exchanger__row-subtitle">
					{exchangerInvoiceValue} {exchangerInvoiceName}
				</div>
			</div>
			<div className="exchanger__row">
				<div className="exchanger__row-title">Buy</div>
				<div className="exchanger__row-subtitle">
					{exchangerWidthdrawValue} {exchangerWidthdrawName}
				</div>
			</div>
			<div className="exchanger__actions">
				<Link to="/" className="exchanger__action button button--transparent">
					Cancel
				</Link>
				<button
					className={classNames("exchanger__action button", {
						disabled: exchangerAllowedToExchange === false,
						loading: exchangerLoading === true,
					})}
					onClick={confirmActionHandler}
				>
					{exchangerLoading ? <Loader /> : "Confirm"}
				</button>
			</div>
		</div>
	)
}
