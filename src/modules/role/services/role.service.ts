import { Injectable } from '@nestjs/common';
import { Role } from '../model/role.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: EntityRepository<Role>,
  ) {}

  async getRoles() {
    const roles = await this.roleRepository.find({});
    return roles;
  }

  async createRole(name: string) {
    const role = this.roleRepository.create({ name: name });
    this.roleRepository.getEntityManager().persistAndFlush(role);
    return role;
  }
}
