import classNames from "classnames"
import DropdownCustom from "components/DropdownCustom/DropdownCustom"
import InputCustom from "components/InputCustom/InputCustom"
import Loader from "components/Loader/Loader"
import { history } from "helpers/history"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { exchangerActions, payMethodsActions } from "redux/actions/index"
import "./homepage.sass"

const HomePage = () => {
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

	const exchangerWidthdrawName = exchanger.withdraw.name || "Buy this"
	const exchangerWidthdrawValue = exchanger.withdraw.value

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

	// useEffect(() => {
	// 	if (payMethods) {
	// 		dispatch(
	// 			exchangerActions.handleDropdownChangeValue(
	// 				"invoice",
	// 				payMethods.invoice[0],
	// 			),
	// 		)
	// 		dispatch(
	// 			exchangerActions.handleDropdownChangeValue(
	// 				"withdraw",
	// 				payMethods.withdraw[1],
	// 			),
	// 		)
	// 	}
	// }, [dispatch, payMethods])

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
					/>
				</div>
			</div>
			<div className="exchanger__actions">
				<Link
					className={classNames("exchanger__action button", {
						disabled: exchangerAllowedToExchange === false,
						loading: payMethodLoading === true,
					})}
					to={{
						pathname: "/details",
						// state: {
						// 	dropdown: dropdownValue,
						// 	invoice: { value: valueInvoice },
						// 	withdraw: { value: valueWithdraw },
						// },
					}}
				>
					{payMethodLoading ? <Loader /> : "Exchange"}
					{/* {payMethodLoading ? <Loader /> : <Loader />} */}
				</Link>
			</div>
		</div>
	)
}

export default HomePage
