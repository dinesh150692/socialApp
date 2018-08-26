/* Library Imports */
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

/* Reducer Imports */
import rootReducer from './reducers';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		applyMiddleware(ReduxThunk)
	);
}