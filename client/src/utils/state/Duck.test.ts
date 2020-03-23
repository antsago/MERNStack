import { put } from "redux-saga/effects"
import Duck from "./Duck"

describe("Duck", () => {
  test("Combine ducks sagas", () => {
    function* testSaga(type) {
      yield put({ type })
    }

    const saga1 = testSaga("Saga1")
    const saga2 = testSaga("Saga2")
    const saga3 = testSaga("Saga3")

    const duck1 = new Duck(null, [saga1], [])
    const duck2 = new Duck(null, [saga2, saga3], [])

    const newDuck = Duck.fromDucks({ duck1, duck2 })

    expect(newDuck.sagas).toContain(saga1)
    expect(newDuck.sagas).toContain(saga2)
    expect(newDuck.sagas).toContain(saga3)
  })

  test("Combine ducks selectors", () => {
    const duck1 = new Duck(null, [], [])
    const selector1 = duck1.selector((state) => state)
    const duck2 = new Duck(null, [], [])
    const selector2 = duck2.selector((state) => state)

    Duck.fromDucks({ duck1, duck2 })

    const testState = { duck1: "duck1", duck2: "duck2" }

    expect(selector1(testState)).toEqual(testState.duck1)
    expect(selector2(testState)).toEqual(testState.duck2)
  })
})
