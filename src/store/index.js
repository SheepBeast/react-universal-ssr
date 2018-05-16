import { createStore, applyMiddleware/*, compose*/ } from 'redux';
// import { persistState } from 'redux-devtools';
// import { DevTools } from './containers/index.js';
import thunk from 'redux-thunk';

import reducers from '../reducers';

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
  const store = createStore(reducers, initialState, applyMiddleware(thunk))

  // if(module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     store.replaceReducer(require('../reducers').default)
  //   })
  // }

  return store
}