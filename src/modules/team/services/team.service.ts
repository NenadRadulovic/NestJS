import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Team } from '../model/team.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RequestTeamDto } from '../dtos/create-team.request';
import { ResponseTeamDto } from '../dtos/team.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { serialize } from '@mikro-orm/core';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: EntityRepository<Team>,
  ) {}

  async createTeam(team: RequestTeamDto): Promise<ResponseTeamDto> {
    const teamEntity = this.teamRepository.create({
      name: team.name,
      employees: team.employees,
    });
    await this.teamRepository.getEntityManager().persistAndFlush(teamEntity);
    return this.parseEntityToDto(teamEntity);
  }

  async getAllTeams(): Promise<ResponseTeamDto[]> {
    const teamEntity = await this.teamRepository.find(
      {},
      { fields: ['*', 'employees'], populate: ['employees'] },
    );
    const result = [];
    teamEntity.forEach((team) => {
      result.push(this.parseEntityToDto(team));
    });
    return result;
  }

  async getTeamById(id: number): Promise<ResponseTeamDto> {
    const teamEntity = await this.teamRepository.findOne(
      {
        id: id,
      },
      {
        populate: ['employees'],
        fields: ['*', 'employees'],
      },
    );
    if (!teamEntity) {
      throw new NotFoundException('Team not found');
    }
    return this.parseEntityToDto(teamEntity);
  }

  async deleteTeam(id: number): Promise<boolean> {
    const teamEntity = this.teamRepository.findOne({
      id: id,
    });
    if (!teamEntity) {
      throw new NotFoundException('Team not found');
    }
    this.teamRepository.getEntityManager().removeAndFlush(teamEntity);
    return true;
  }

  private parseEntityToDto(entity: Team): ResponseTeamDto {
    const data = instanceToPlain(
      serialize(entity, { populate: ['employees'] }),
    );
    return plainToInstance(ResponseTeamDto, data);
  }
}
