/* eslint-disable @typescript-eslint/no-explicit-any */
export default class SelectorPrefix {
  private prefixes: ((any) => any)[] = []

  getLocalState(rootState): any {
    return this.prefixes.reduceRight(
      (prevState, prefix) => prefix(prevState),
      rootState,
    )
  }

  addPrefix(prefix): void {
    this.prefixes.push(prefix)
  }
}
