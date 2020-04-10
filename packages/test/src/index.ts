export interface User {
  id: string
  givenName?: string
  familyName?: string
  email?: string
  created: Date
}

export type UserInput = Partial<Omit<User, "id" | "created">>

export interface UsersResolver {
  deleteUser: (id: string) => Promise<User>
}

