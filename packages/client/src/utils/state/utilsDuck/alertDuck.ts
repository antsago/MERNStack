import { PayloadAction } from "@reduxjs/toolkit"
import { Alert } from "../../types"
import Duck from "../Duck"

const initialState: Alert[] = []
const { actions, duck } = Duck.fromSlice({
  name: "alerts",
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<Alert>) => {
        state.push(action.payload)
      },
      prepare: (message: string) => ({ payload: { message, id: Date.now() } }),
    },
    dismiss: (state) => {
      state.pop()
    },
  },
})

export const addAlert = actions.add
export const dismissAlert = actions.dismiss
export const shownAlert = duck.selector((alerts) =>
  alerts.length > 0 ? alerts[0] : undefined,
)

export default duck
