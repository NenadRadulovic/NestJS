import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeService } from './services/employee.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Employee } from './model/employee.entitiy';

@Module({
  imports: [MikroOrmModule.forFeature([Employee])],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [],
})
export class EmployeeModule {}
