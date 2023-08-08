import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { User } from '../model/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RoleModule } from '../../role/role.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forFeature([User]), RoleModule],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
