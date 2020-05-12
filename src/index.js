import React from "react"
import App from "./App"
import { render } from "react-dom"
import { Provider } from "react-redux"
import { store } from "helpers/store"

render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
)
