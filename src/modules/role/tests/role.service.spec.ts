import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '../services/role.service';
import { Role } from '../model/role.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([Role])],
      providers: [RoleService, Role],
    }).compile();

    service = module.get<RoleService>(RoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
