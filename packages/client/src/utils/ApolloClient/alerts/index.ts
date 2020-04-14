import { resolver as addResolver } from "./AddAlert"
import { resolver as dismissResolver } from "./DismissAlert"

export { default as useAddAlert } from "./AddAlert"
export { default as useGetShownAlert } from "./GetAlerts"
export { default as useDismissAlert } from "./DismissAlert"

export default { ...addResolver, ...dismissResolver }
