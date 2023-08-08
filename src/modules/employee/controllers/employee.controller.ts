import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { CreateEmployeeRequestDto } from '../dtos/create-employee.request';
import { HttpExceptionFilter } from '../../../http-exception.filter';

@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Post('/')
  @UseFilters(HttpExceptionFilter)
  async create(@Body() data: CreateEmployeeRequestDto) {
    const employee = await this.employeeService.createEmployee(data);
    return employee;
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() emplyee: CreateEmployeeRequestDto,
  ) {
    const response = await this.employeeService.updateEmployee(id, emplyee);
    return response;
  }

  @Get('/')
  async index() {
    const response = await this.employeeService.getEmployees();
    return response;
  }

  @Get('/:id')
  @UseFilters(HttpExceptionFilter)
  async view(@Param('id', new ParseIntPipe()) id: number) {
    const response = await this.employeeService.getEmployeeById(id);
    return response;
  }
}
