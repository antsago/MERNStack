import React from "react"
import { Layout, UsersList } from "../components"
import { useGetAlerts } from "../utils"

export const Index = () => {
  const alerts = useGetAlerts()

  return (
    <Layout>
      {JSON.stringify(alerts)}
      <UsersList />
    </Layout>
  )
}

export default Index
