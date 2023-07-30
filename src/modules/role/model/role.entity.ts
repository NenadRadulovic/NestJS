import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Role {
  @PrimaryKey()
  _id!: number;

  @Property()
  name: string;

  @Property()
  created_at = new Date();
}
