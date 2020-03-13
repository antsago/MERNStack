import { ManageAlerts, AlertState } from './types'
import Reducer from '../ReducerFactory'

const initialState: AlertState = []

const actionsMap = {
  [ManageAlerts.ADD_ALERT]: (state, action) => state.push(action.alert),
  [ManageAlerts.DISMISS_ALERT]: state => state.pop()
}

export const reducer = new Reducer<ManageAlerts, AlertState>(
  initialState,
  actionsMap
)

export const shownAlert = reducer.selector(state =>
  state.length > 0 ? state[0] : undefined
)
