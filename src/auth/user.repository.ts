import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSaltSync(10);
    console.log(`signUp salt: ${JSON.stringify(salt)}`);
    const hashedPassword = await this.hashPassword(password, salt);
    const user = this.create({ username, salt, password: hashedPassword });

    console.log(`signUp hashed password: ${JSON.stringify(hashedPassword)}`);
    try {
      await user.save();
    } catch (error) {
      console.log(error.code);
      if (error.code === '23505') {
        throw new ConflictException(`Username "${username}" already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
