import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service';
import { UserModule } from '../../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../services/jwt.strategy';
import { AuthController } from '../controllers/auth.controller';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '6000s' },
        }),
      ],
      providers: [AuthService, JwtStrategy],
      controllers: [AuthController],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
