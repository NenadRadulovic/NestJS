import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { Role } from './model/role.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([Role])],
  providers: [RoleService, Role],
  exports: [Role],
})
export class RoleModule {}
