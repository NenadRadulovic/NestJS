import { Module } from '@nestjs/common';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Team } from './model/team.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Team])],
  providers: [TeamService],
  controllers: [TeamController],
  exports: [],
})
export class TeamModule {}
