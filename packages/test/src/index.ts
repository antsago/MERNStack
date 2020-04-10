export interface User {
  id: string
  givenName?: string
  familyName?: string
  email?: string
  created: Date
}

export type UserInput = Partial<Omit<User, "id" | "created">>

export interface UsersResolver {
  user: (id: string) => Promise<User>
  users: () => Promise<User[]>
  createUser: (user: UserInput) => Promise<User>
  updateUser: (id: string, user: UserInput) => Promise<User>
  deleteUser: (id: string) => Promise<User>
}
