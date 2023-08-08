import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { TeamModule } from './modules/team/team.module';
import { EmployeeModule } from './modules/employee/employee.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    AuthModule,
    RoleModule,
    TeamModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
