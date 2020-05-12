// import "bootstrap/dist/css/bootstrap.min.css"
import "assets/sass/app.sass"
import React from "react"
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom"
import { PublicRoute } from "router"
import HomePage from "pages/HomePage/HomePage"
import Layout from "layouts/Layout"
import DetailsPage from "pages/DetailsPage/DetailsPage"
import SuccessPage from "pages/SuccessPage/SuccessPage"

function App() {
	return (
		<Router>
			<Switch>
				<PublicRoute path="/" exact component={HomePage} layout={Layout} />
				<PublicRoute path="/details" component={DetailsPage} layout={Layout} />
				<PublicRoute path="/success" component={SuccessPage} layout={Layout} />
				<PublicRoute path="/error" component={SuccessPage} layout={Layout} />
				<Redirect to="/" />
			</Switch>
		</Router>
	)
}

export default App
