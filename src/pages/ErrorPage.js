import { ReactComponent as ShieldIcon } from "assets/icons/shield.svg"
import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { exchangerActions } from "redux/actions"

export const ErrorPage = () => {
	const dispatch = useDispatch()
	let history = useHistory()

	const clearStorage = () => {
		dispatch(exchangerActions.resetExchanger())
		history.push("/")
	}

	return (
		<div className="exchanger exchanger--center exchanger--column exchanger--small">
			<div className="exchanger__image exchanger__image--error">
				<ShieldIcon />
			</div>
			<div className="exchanger__title exchanger__title--small">Such a pity!</div>
			<div className="exchanger__subtitle">
				Your exchange order hasn't been placed successfully, try again. But we have
				your money. Well done!
			</div>
			<div className="exchanger__actions">
				<button className="exchanger__action button" onClick={clearStorage}>
					Go home and try again
				</button>
			</div>
		</div>
	)
}
