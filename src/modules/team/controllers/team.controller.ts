import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TeamService } from '../services/team.service';
import { RequestTeamDto } from '../dtos/create-team.request';
import { ResponseTeamDto } from '../dtos/team.response';

@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Post('/')
  async create(@Body() teamDto: RequestTeamDto) {
    const response = await this.teamService.createTeam(teamDto);
    return response;
  }

  @Get('/')
  async index() {
    const response = await this.teamService.getAllTeams();
    return response;
  }

  @Get('/:id')
  async show(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<ResponseTeamDto> {
    const result = this.teamService.getTeamById(id);
    return result;
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
    const result = this.teamService.deleteTeam(id);
    return result;
  }
}
