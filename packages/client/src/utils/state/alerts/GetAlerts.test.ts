import useGetShownAlert from "./GetAlerts"
import { Alert } from "../../types"

describe("useGetShownAlert", () => {
  test("With alerts returns first alert", () => {
    const alert: Alert = { message: "Hello test", id: 1 }
    const queryHook = jest.fn()
    queryHook.mockReturnValue({ data: { alerts: [alert] } })

    const returnedAlert = useGetShownAlert(queryHook)

    expect(returnedAlert).toEqual(alert)
  })

  test("With no alerts returns undefined", () => {
    const queryHook = jest.fn()
    queryHook.mockReturnValue({ data: { alerts: [] } })

    const returnedAlert = useGetShownAlert(queryHook)

    expect(returnedAlert).toBe(undefined)
  })
})
