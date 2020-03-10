import { ObjectType, InputType, Field, ID } from 'type-graphql'

@ObjectType()
export abstract class User {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  familyName?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  created?: Date
}

@InputType()
export abstract class UserInput implements Partial<User> {
  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  familyName?: string

  @Field({ nullable: true })
  email?: string
}
