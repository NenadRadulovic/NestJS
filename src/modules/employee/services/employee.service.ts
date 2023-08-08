import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '../model/employee.entitiy';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateEmployeeRequestDto } from '../dtos/create-employee.request';
import { serialize } from '@mikro-orm/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ResponseEmployeeDto } from '../dtos/employee-dto.response';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: EntityRepository<Employee>,
  ) {}

  async createEmployee(
    employee: CreateEmployeeRequestDto,
  ): Promise<ResponseEmployeeDto> {
    const result = this.employeeRepository.create({
      alias: employee.alias,
      first_name: employee.first_name,
      last_name: employee.last_name,
      team: employee.team,
      joined_team: employee.team ? new Date() : null,
    });

    await this.employeeRepository.getEntityManager().persistAndFlush(result);
    return this.parseEntityToDto(result);
  }

  async deleteEmployee(employeeId: number): Promise<boolean> {
    const employee = await this.employeeRepository.find({
      id: employeeId,
    });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    await this.employeeRepository.getEntityManager().removeAndFlush(employee);

    return true;
  }

  async getEmployees(): Promise<ResponseEmployeeDto[]> {
    const employees = await this.employeeRepository.find(
      {},
      {
        fields: ['*', 'team.name'],
      },
    );
    const result = [];
    employees.forEach((emp) => {
      result.push(this.parseEntityToDto(emp));
    });
    return result;
  }

  async getEmployeeById(id: number): Promise<ResponseEmployeeDto> {
    const result = await this.employeeRepository.findOne(
      {
        id,
      },
      {
        fields: ['*', 'team.name'],
      },
    );
    if (!result) {
      throw new NotFoundException('Invalid employee id provided');
    }
    return this.parseEntityToDto(result);
  }

  async updateEmployee(
    id: number,
    data: CreateEmployeeRequestDto,
  ): Promise<ResponseEmployeeDto> {
    const employee = await this.employeeRepository.findOne({ id });
    const result = this.employeeRepository
      .getEntityManager()
      .assign(employee, data, { updateByPrimaryKey: true });
    await this.employeeRepository.getEntityManager().persistAndFlush(result);

    return this.parseEntityToDto(result);
  }

  private parseEntityToDto(data: Employee): ResponseEmployeeDto {
    const response = instanceToPlain(
      serialize(data, {
        populate: ['team.name'],
      }),
    );
    return plainToInstance(ResponseEmployeeDto, response);
  }
}
