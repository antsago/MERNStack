import { Store } from "redux"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import createSagaMiddleware, { Task } from "redux-saga"
import { rootReducer, rootSaga } from "./rootDuck"

interface StoreWithSaga extends Store {
  sagaTask?: Task
}

function createReduxStore(initialState, { isServer, req = null }): Store {
  const sagaMiddleware = createSagaMiddleware()
  const store: StoreWithSaga = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
    preloadedState: initialState,
  })

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }

  return store
}

export default createReduxStore
