import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    console.log(`signUp auth dto: ${JSON.stringify(authCredentialsDto)}`);
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  //AuthGuard: receive an authenticated user as argument, then extract and validate the token
  @UseGuards(AuthGuard())
  /* process sequence:
   * 1. AuthGuard
   *    - run JwtStrategy.validate (coz it extends PassportStrategy)
   * 2. GetUser
   *    - return user from AuthGuard
   */
  test(@GetUser() user: User): void {
    console.log(`REST test call result: ${JSON.stringify(user)}`);
  }
}
