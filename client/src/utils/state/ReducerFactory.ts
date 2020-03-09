export default class ReducerFactory {
  private level

  constructor (private initialState, private actionsMap) {
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
