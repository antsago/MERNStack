import React from "react"
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import { Layout, UsersList } from "../components"

const GET_COUNTER = gql`
  query GetCounterValue {
    counter @client
  }
`

export const Index = () => {
  const { data } = useQuery(GET_COUNTER)

  return (
    <Layout>
      {JSON.stringify(data)}
      <UsersList />
    </Layout>
  )
}

export default Index
