import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id!: number;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  first_name?: string;

  @Field()
  last_name?: string;

  @Field()
  role: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
