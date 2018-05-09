import { createStore, applyMiddleware/*, compose*/ } from 'redux';
// import { persistState } from 'redux-devtools';
import reducers from './reducers/index.js';
// import { DevTools } from './containers/index.js';
import thunk from 'redux-thunk';
// Apply middleware here
// ...

/* start redux-devtools */
// const enhancer = compose(
// 	DevTools.instrument(),
// 	persistState(
// 		window.location.href.match(
// 			/[?&]debug_session=([^&#]+)\b/
// 		)
// 	)
// );

export default function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(thunk))
}