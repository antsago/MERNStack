import { Alert } from '../../types'

export type AlertState = Alert[]

export enum ManageAlerts {
  ADD_ALERT = 'ADD_ALERT',
  DISMISS_ALERT = 'DISMISS_ALERT'
}

interface AddAlertAction {
  type: ManageAlerts.ADD_ALERT
  alert: Alert
}

interface DismissAlertAction {
  type: ManageAlerts.DISMISS_ALERT
}

export type AlertTypes = AddAlertAction | DismissAlertAction
