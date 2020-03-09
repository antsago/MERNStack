import { combineReducers } from 'redux'

export default class ReducerFactory<
  Actions extends string | number | symbol,
  State
> {
  private level

  constructor (
    private initialState: State,
    private actionsMap: Record<Actions, (state: State, action: any) => State>
  ) {
    this.level = state => state
  }

  setLevel (newLevel) {
    this.level = state => state[newLevel]
  }

  selector (select) {
    return state => select(this.level(state))
  }

  reducer () {
    return (state = this.initialState, action) => {
      const fn = this.actionsMap[action.type]
      return fn ? fn(state, action) : state
    }
  }
}

export function mapReducers (
  reducersMap: Record<string, ReducerFactory<any, any>>
) {
  return combineReducers(
    Object.entries(reducersMap).reduce((map, [level, factory]) => {
      factory.setLevel(level)
      map[level] = factory.reducer()
      return map
    }, {})
  )
}
