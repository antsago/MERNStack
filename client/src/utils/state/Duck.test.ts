import Duck, { SelectorPrefix } from './Duck'
import { put } from 'redux-saga/effects'

describe('Duck', () => {
  test('Adding of prefixes', () => {
    const prefix = new SelectorPrefix()

    const selector = state => prefix.getLocalState(state)[0]
    expect(selector([1])).toBe(1)

    prefix.addPrefix(state => state.list)
    expect(selector({ list: [1] })).toBe(1)

    prefix.addPrefix(state => state.location)
    expect(selector({ location: { list: [1] } })).toBe(1)
  })

  test('Combine ducks sagas', () => {
    function * saga1 () {
      yield put({ type: 'Saga1' })
    }
    function * saga2 () {
      yield put({ type: 'Saga2' })
    }
    function * saga3 () {
      yield put({ type: 'Saga3' })
    }

    const duck1 = new Duck(null, [saga1], [])
    const duck2 = new Duck(null, [saga2, saga3], [])

    const newDuck = Duck.fromDucks({ duck1, duck2 })

    expect(newDuck.sagas).toContain(saga1)
    expect(newDuck.sagas).toContain(saga2)
    expect(newDuck.sagas).toContain(saga3)
  })

  test('Combine ducks selectors', () => {
    const duck1 = new Duck(null, [], [])
    const selector1 = duck1.selector(state => state)
    const duck2 = new Duck(null, [], [])
    const selector2 = duck2.selector(state => state)

    Duck.fromDucks({ duck1, duck2 })

    const testState = { duck1: 'duck1', duck2: 'duck2' }

    expect(selector1(testState)).toEqual(testState.duck1)
    expect(selector2(testState)).toEqual(testState.duck2)
  })
})
