import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Employee } from '../../employee/model/employee.entitiy';

@Entity()
export class Team {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => Employee, 'team')
  employees = new Collection<Employee>(this);

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })
  updated_at = new Date();
}
