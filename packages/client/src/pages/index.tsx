import React from "react"
import { Layout, UsersList } from "../components"
import { useGetCounter } from "../utils"

export const Index = () => {
  const counter = useGetCounter()

  return (
    <Layout>
      {JSON.stringify(counter)}
      <UsersList />
    </Layout>
  )
}

export default Index
