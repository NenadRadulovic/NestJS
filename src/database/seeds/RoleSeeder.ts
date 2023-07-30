import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Role } from '../../modules/role/model/role.entity';

export class RoleSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Role, {
      name: 'admin',
    });
    em.create(Role, {
      name: 'user',
    });
  }
}
