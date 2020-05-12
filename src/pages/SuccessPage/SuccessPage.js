import { ReactComponent as ShieldIcon } from "assets/icons/shield.svg"
import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { exchangerActions } from "redux/actions/index"
import "./successpage.sass"

const SuccessPage = () => {
	const dispatch = useDispatch()
	let history = useHistory()

	const clearStorage = () => {
		dispatch(exchangerActions.resetExchanger())
		history.push("/")
	}

	return (
		<div className="exchanger exchanger--center exchanger--column exchanger--small">
			<div className="exchanger__image">
				<ShieldIcon />
			</div>
			<div className="exchanger__title exchanger__title--small">Success!</div>
			<div className="exchanger__subtitle">
				Your exchange order has been placed successfully and will be processed soon.
			</div>
			<div className="exchanger__actions">
				<button className="exchanger__action button" onClick={clearStorage}>
					Home
				</button>
			</div>
		</div>
	)
}

export default SuccessPage
