import duck, { addAlert, dismissAlert } from "./alertDuck"

describe("Utils duck", () => {
  test("Add alert", () => {
    const newAlert = "Test message"
    const newState = duck.reducer([], addAlert(newAlert))

    expect(newState[0]).toEqual(expect.objectContaining({ message: newAlert }))
  })

  test("Dismiss alert", () => {
    const newState = duck.reducer(
      [{ id: 1, message: "Test message" }],
      dismissAlert(),
    )

    expect(newState.length).toBe(0)
  })
})
