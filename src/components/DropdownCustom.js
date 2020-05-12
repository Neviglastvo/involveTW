import classNames from "classnames"
import useOutsideClick from "hooks/useOutsideClick"
import React, { useRef, useState } from "react"

const DropdownCustom = ({
	items,
	type,
	handleDropdownChange,
	currentValue,
}) => {
	const [open, setOpen] = useState(false)

	const handleDropdownValueChange = (item) => {
		handleDropdownChange(type, item)
	}

	const handleDropdownToggle = () => setOpen(!open)

	const ref = useRef()

	useOutsideClick(ref, () => {
		setOpen(false)
	})

	return (
		<div className={"dropdown"}>
			<div
				className={classNames("dropdown__input", {
					"dropdown__input--open": open === true,
				})}
				onClick={handleDropdownToggle}
				ref={ref}
			>
				<span className="dropdown__input-value">{currentValue}</span>
			</div>
			<div
				className={classNames("dropdown__menu", {
					"dropdown__menu--open": open === true,
				})}
			>
				{items
					? items.map((item, index) => {
							return (
								<div
									className={classNames("dropdown__menuItem", {
										"dropdown__menuItem--active": currentValue === item.name,
									})}
									key={index}
									onClick={() => {
										handleDropdownValueChange(item)
									}}
								>
									{item.name}
								</div>
							)
					  })
					: "loading"}
			</div>
		</div>
	)
}

export default DropdownCustom
