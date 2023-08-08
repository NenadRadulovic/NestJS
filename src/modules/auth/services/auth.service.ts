import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserType, JwtType } from '../types/auth.type';
import { User } from '../../user/model/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthUserType): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new Error('User doesnt exist with provided email');
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new Error('Password doesnt match');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return user;
  }

  async login(user: User): Promise<JwtType> {
    const payload = {
      email: user.email,
      sub: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
