import Loader from "components/Loader/Loader"
import debounce from "lodash/debounce"
import React, { useCallback, useEffect, useState } from "react"
import "./inputcustom.sass"
import classNames from "classnames"

const InputCustom = (props) => {
	const { type, placeholder, value, handleInputChange, loading } = props

	const [inputVal, setInputVal] = useState(value)

	const [error, setError] = useState(false)

	const handleInputValueChange = (inputVal) => {
		handleInputChange(type, Number(inputVal))
	}

	function useDebouncedCallback(callback, delay) {
		const d = callback

		const callbackfunc = useCallback(debounce(d, delay), [])

		return callbackfunc
	}

	const debouncedFunction = useDebouncedCallback(handleInputValueChange, 1000)

	const inputHandler = (e) => {
		const inputValue = e.target.value

		const onlyPositiveNumberOrFloatRegExp = /^(?:[1-9]\d*|0)?(?:\.\d+)?$/

		setInputVal(inputValue)
		if (inputValue === "") {
			setError("enter correct value, pls")
		} else if (inputValue > 1000000) {
			setError("you can`t be so rich, calm down, 1kk is enough")
		} else if (inputValue == 0) {
			setError("come on, you can`t sell 0 money")
		} else if (onlyPositiveNumberOrFloatRegExp.test(inputValue)) {
			setError(false)
			debouncedFunction(inputValue)
		} else {
			setError("enter correct value, pls")
		}
	}

	useEffect(() => {
		setInputVal(value)
	}, [value])

	return (
		<div className="inputcustom">
			{error && <div className="inputcustom__error-message">{error}</div>}
			<input
				type="number"
				className={classNames("inputcustom__input", {
					error: error !== false,
				})}
				placeholder={placeholder}
				name={type}
				id={type}
				value={inputVal}
				onChange={inputHandler}
			/>
			{loading && <Loader />}
		</div>
	)
}

export default InputCustom
