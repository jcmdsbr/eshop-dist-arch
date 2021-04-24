import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import LoginDto from './dtos/login.dto';
import TokenDto from './dtos/token.dto';
import { ConfigService } from '@nestjs/config';
import User from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateUserDto from './dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configure: ConfigService,
    @InjectModel(User.name)
    private readonly repository: Model<User>,
  ) {}

  async create(createUser: CreateUserDto): Promise<any> {
    if (
      await this.repository.exists(
        (user: User) => user.email === createUser.email,
      )
    ) {
      const errorMessage: string = 'email unavailable';
      throw new BadRequestException({ message: errorMessage }, errorMessage);
    }

    await this.repository.create(
      User.Create(createUser.email, createUser.password),
    );
    return await this.login({ ...createUser });
  }

  async login(login: LoginDto): Promise<TokenDto> {
    const user = await this.repository.findOne(
      (x: User) => x.email === login.email,
    );

    if (user.Compare(login.password)) {
      const payload = { username: login.email, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      const expiredAt = this.configure.get<number>('JWT_TOKEN_EXPIRED');
      return new TokenDto(token, expiredAt);
    }

    throw new UnauthorizedException();
  }

  async logout(token: string) {
    // implement later
  }
}
