import { NextPageContext } from "next"
import { Store } from "redux"

export interface Context extends NextPageContext {
  store: Store
}

export default Context
