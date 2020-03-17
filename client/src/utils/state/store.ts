import { applyMiddleware, createStore, Store } from 'redux'
import { all } from 'redux-saga/effects'
import createSagaMiddleware, { Task } from 'redux-saga'
import config from '../config'
import usersDuck from './usersDuck'
import utilsDuck from './utilsDuck'
import Duck from './Duck'

const rootDuck = Duck.fromDucks({
  users: usersDuck,
  utils: utilsDuck
})

function * rootSaga () {
  yield all(rootDuck.sagas)
}

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
    rootDuck.reducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  return store
}

export default configureStore
