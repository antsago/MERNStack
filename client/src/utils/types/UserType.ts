export interface User {
  id: string
  givenName?: string
  familyName?: string
  email?: string
  created?: Date
}

export interface UserInput extends Partial<User> {
  givenName?: string
  familyName?: string
  email?: string
}
