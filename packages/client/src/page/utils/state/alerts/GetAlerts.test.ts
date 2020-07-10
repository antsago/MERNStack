import useGetShownAlert from "./GetAlerts"
import { testAlert } from "../../../testHelpers"

describe("useGetShownAlert", () => {
  test("With alerts returns first alert", () => {
    const alert = testAlert()
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
