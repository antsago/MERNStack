import { combineReducers } from 'redux'
import { ForkEffect, all, takeEvery } from 'redux-saga/effects'
import {
  createSlice,
  CreateSliceOptions,
  SliceCaseReducers,
  Reducer,
  Slice,
  createAction,
  PayloadActionCreator,
  PrepareAction
} from '@reduxjs/toolkit'

export class SelectorPrefix {
  private prefixes: ((any) => any)[] = []

  getLocalState (rootState) {
    return this.prefixes.reduceRight(
      (prevState, prefix) => prefix(prevState),
      rootState
    )
  }

  addPrefix (prefix) {
    this.prefixes.push(prefix)
  }
}

interface SliceReturn<State, CaseReducers extends SliceCaseReducers<State>>
  extends Slice<State, CaseReducers> {
  duck: Duck<State>
}

interface SagaArgument<P> {
  type: string
  prepare?: PrepareAction<P>
  effect: (string) => ForkEffect
}

export default class Duck<State> {
  private prefix: SelectorPrefix = new SelectorPrefix()

  constructor (
    public reducer: Reducer<State>,
    public sagas: ForkEffect[] = [],
    public dependentSelectors: SelectorPrefix[] = []
  ) {}

  static fromSlice<State, CaseReducers extends SliceCaseReducers<State>> (
    sliceOptions: CreateSliceOptions<State, CaseReducers>
  ): SliceReturn<State, CaseReducers> {
    const slice = createSlice(sliceOptions)
    return {
      ...slice,
      duck: new Duck(slice.reducer)
    }
  }

  static fromDucks (duckMap: Record<string, Duck<any>>) {
    const reducerMap = Object.entries(duckMap).reduce((map, [level, duck]) => {
      map[level] = duck.reducer
      return map
    }, {})

    const reducers = combineReducers(reducerMap)

    const sagas = [].concat(Object.values(duckMap).map(duck => duck.sagas))

    const dependentSelectors = Object.entries(duckMap).reduce(
      (allDependents, [prefix, duck]) => {
        const newDependents = duck.dependentSelectors.concat(duck.prefix)
        newDependents.forEach(dependent =>
          dependent.addPrefix(state => state[prefix])
        )
        return allDependents.concat(newDependents)
      },
      []
    )

    return new Duck(reducers, sagas, dependentSelectors)
  }

  saga<P> (options: SagaArgument<P>) {
    const action = createAction(options.type, options.prepare)
    this.sagas.push(options.effect(action.type))

    return action
  }

  selector (select) {
    return state => select(this.prefix.getLocalState(state))
  }
}
