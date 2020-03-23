/* eslint-disable max-classes-per-file */
import { ObjectType, InputType, Field, ID } from "type-graphql"

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

  @Field()
  created: Date
}

@InputType()
export abstract class UserInput implements Omit<User, "id" | "created"> {
  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  familyName?: string

  @Field({ nullable: true })
  email?: string
}
