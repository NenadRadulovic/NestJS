import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Team } from '../../team/model/team.entity';

@Entity()
export class Employee {
  @PrimaryKey()
  id!: number;

  @Property()
  first_name!: string;

  @Property()
  last_name!: string;

  @Property()
  alias!: string;

  @Property()
  joined_team?: Date;

  @ManyToOne()
  team?: Team;

  @Property()
  created_at = new Date();

  @Property({ onUpdate: () => new Date() })

  // 17h 14.08
  // u petak urin i krv
  updated_at = new Date();
}
