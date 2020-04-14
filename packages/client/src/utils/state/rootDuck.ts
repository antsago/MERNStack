import { all } from "redux-saga/effects"
import utilsDuck from "./utilsDuck"
import Duck from "./Duck"

export const rootDuck = Duck.fromDucks({
  utils: utilsDuck,
})

export const rootReducer = rootDuck.reducer

export function* rootSaga(): Generator {
  yield all(rootDuck.sagas)
}
