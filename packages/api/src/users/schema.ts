/* eslint-disable max-classes-per-file */
import { ObjectType, InputType, Field, ID } from "type-graphql"
import {
  User as UserDefinition,
  UserInput as UserInputDefintion,
} from "@djogger/test"

@ObjectType()
export abstract class User implements UserDefinition {
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
export abstract class UserInput implements UserInputDefintion {
  @Field({ nullable: true })
  givenName?: string

  @Field({ nullable: true })
  familyName?: string

  @Field({ nullable: true })
  email?: string
}
