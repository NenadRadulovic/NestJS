import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { Role } from './model/role.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoleResolver } from './resolver/role.resolver';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RoleService, RoleResolver, Role],
  exports: [Role],
})
export class RoleModule {}
