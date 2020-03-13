import { ManageAlerts, AlertTypes } from './types'

export function addAlert (message): AlertTypes {
  return { type: ManageAlerts.ADD_ALERT, alert: { message, id: Date.now() } }
}
export function dismissAlert (): AlertTypes {
  return { type: ManageAlerts.DISMISS_ALERT }
}
