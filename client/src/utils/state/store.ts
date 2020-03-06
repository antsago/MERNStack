import { applyMiddleware, createStore, Store } from 'redux'
import createSagaMiddleware, { Task } from 'redux-saga'
import { rootReducer, rootSaga } from './rootStore'
import config from '../config'

interface SagaStore extends Store {
  sagaTask?: Task
}

const bindMiddleware = middleware => {
  if (config.env === 'development') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

function configureStore (initialState, { isServer, req = null }): Store {
  const sagaMiddleware = createSagaMiddleware()
  const store: SagaStore = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  return store
}

export default configureStore
