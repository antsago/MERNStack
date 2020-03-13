import { reducer } from './reducer'
import { addAlert, dismissAlert } from './actions'

describe('Utils reducer', () => {
  test('Add alert', () => {
    const alerts = []
    const newAlert = 'Test message'
    reducer.reducer()(alerts, addAlert(newAlert))

    expect(alerts[0]).toEqual(expect.objectContaining({ message: newAlert }))
  })

  test('Dismiss alert', () => {
    const alerts = [{ id: 1, message: 'Test message' }]
    reducer.reducer()(alerts, dismissAlert())

    expect(alerts.length).toBe(0)
  })
})
