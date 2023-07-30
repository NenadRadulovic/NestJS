import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Role } from '../../role/model/role.entity';

@Entity()
export class User {
  @PrimaryKey()
  _id!: number;

  @Property()
  email: string;

  @Property()
  password: string;

  @Property()
  first_name?: string;

  @OneToOne()
  role!: Role;

  @Property()
  last_name?: string;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}
