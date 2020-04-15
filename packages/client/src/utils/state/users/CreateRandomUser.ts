import { UserInput } from "@mernstack/shared"
import { firstNames, lastNames } from "./names"
import useCreateUser from "./CreateUser"

const getRandomUser = () => {
  const name = firstNames[Math.floor(Math.random() * firstNames.length)]
  const surname = lastNames[Math.floor(Math.random() * lastNames.length)]

  const randomUser: UserInput = {
    givenName: name,
    familyName: surname,
    email: `${name}@${surname}.com`,
  }

  return randomUser
}

export default () => {
  const createUser = useCreateUser()

  return async () => createUser(getRandomUser())
}
