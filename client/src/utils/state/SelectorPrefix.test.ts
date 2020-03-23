import SelectorPrefix from "./SelectorPrefix"

describe("SelectorPrefix", () => {
  test("Adding of prefixes", () => {
    const prefix = new SelectorPrefix()

    const selector = (state) => prefix.getLocalState(state)[0]
    expect(selector([1])).toBe(1)

    prefix.addPrefix((state) => state.list)
    expect(selector({ list: [1] })).toBe(1)

    prefix.addPrefix((state) => state.location)
    expect(selector({ location: { list: [1] } })).toBe(1)
  })
})
