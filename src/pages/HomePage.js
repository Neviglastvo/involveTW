import classNames from "classnames"
import DropdownCustom from "components/DropdownCustom"
import InputCustom from "components/InputCustom"
import Loader from "components/Loader"
import { history } from "helpers/history"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { exchangerActions, payMethodsActions } from "redux/actions/index"

export const HomePage = () => {
	const dispatch = useDispatch()

	const payMethod = useSelector((state) => state.payMethod)
	const payMethodLoading = payMethod && payMethod.loading
	const payMethodError = payMethod && payMethod.error
	const payMethods = payMethod && payMethod.payMethods

	const exchanger = useSelector((state) => state.exchanger)
	const exchangerLoading = exchanger.loading
	const exchangerError = exchanger.error
	const exchangerAllowedToExchange = exchanger.allowedToExchange

	const exchangerInvoiceName = exchanger.invoice.name || "Sell this"
	const exchangerInvoiceValue = exchanger.invoice.value
	const exchangerInvoiceId = exchanger.invoice.id

	const exchangerWidthdrawName = exchanger.withdraw.name || "Buy this"
	const exchangerWidthdrawValue = exchanger.withdraw.value
	const exchangerWidthdrawId = exchanger.withdraw.id

	const handleInputChange = (type, value) => {
		dispatch(exchangerActions.handleInputChangeValue(type, { value: value }))
	}

	const handleDropdownChange = (type, item) => {
		dispatch(exchangerActions.handleDropdownChangeValue(type, item))
	}

	useEffect(() => {
		if (!payMethods) {
			dispatch(payMethodsActions.getAllPayMethods())
		}
	}, [dispatch, payMethods])

	useEffect(() => {
		if (payMethods) {
			if (!exchangerInvoiceId) {
				dispatch(
					exchangerActions.handleDropdownChangeValue(
						"invoice",
						payMethods.invoice[0],
					),
				)
			}

			if (!exchangerWidthdrawId) {
				dispatch(
					exchangerActions.handleDropdownChangeValue(
						"withdraw",
						payMethods.withdraw[1],
					),
				)
			}
		}
	}, [
		dispatch,
		exchangerInvoiceId,
		exchangerInvoiceName,
		exchangerWidthdrawId,
		exchangerWidthdrawName,
		payMethods,
	])

	if (payMethodError && exchangerError) {
		history.push("/error")
	}

	return (
		<div
			className={classNames("exchanger", {
				loading: payMethodLoading === true,
			})}
		>
			<div className="exchanger__col exchanger__col--half">
				<div className="exchanger__title">Sell</div>
				<div className="exchanger__item">
					<DropdownCustom
						items={payMethods && payMethods.invoice}
						type="invoice"
						handleDropdownChange={handleDropdownChange}
						currentValue={exchangerInvoiceName}
					/>
				</div>
				<div className="exchanger__item">
					<InputCustom
						type="invoice"
						value={exchangerInvoiceValue}
						handleInputChange={handleInputChange}
						loading={exchangerLoading}
						placeholder={`Sell some ${exchangerInvoiceName}`}
					/>
				</div>
			</div>
			<div className="exchanger__col exchanger__col--half">
				<div className="exchanger__title">Buy</div>
				<div className="exchanger__item">
					<DropdownCustom
						items={payMethods && payMethods.withdraw}
						type="withdraw"
						handleDropdownChange={handleDropdownChange}
						currentValue={exchangerWidthdrawName}
					/>
				</div>
				<div className="exchanger__item">
					<InputCustom
						type="withdraw"
						value={exchangerWidthdrawValue}
						handleInputChange={handleInputChange}
						loading={exchangerLoading}
						placeholder={`Buy some ${exchangerWidthdrawName}`}
					/>
				</div>
			</div>
			{exchangerError && <div className="exchanger__helper">{exchangerError}</div>}
			<div className="exchanger__actions">
				<Link
					className={classNames("exchanger__action button", {
						disabled: exchangerAllowedToExchange === false,
						loading: payMethodLoading === true,
					})}
					to={{
						pathname: "/details",
					}}
				>
					{payMethodLoading ? <Loader /> : "Exchange"}
				</Link>
			</div>
		</div>
	)
}
