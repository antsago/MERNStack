import React, { ComponentType, FC } from "react"
import useAddAlert from "./AddAlert"

export interface WithAddAlert {
  addAlert: (message: string) => void
}

type WithAddAlertReturn<P> = FC<Omit<P, keyof WithAddAlert>>

export function withAddAlert<P extends object>(
  WrappedComponent: ComponentType<P>,
): WithAddAlertReturn<P> {
  return (props) => {
    const addAlert = useAddAlert()

    return <WrappedComponent {...(props as P)} addAlert={addAlert} />
  }
}
