import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
