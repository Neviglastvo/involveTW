import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { rootReducer } from "redux/reducers/root.reducer"
import persistState from "redux-localstorage"

export const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk),
		persistState(/*paths, config*/),
		// other store enhancers if any
	),
)
