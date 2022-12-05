import { AuthGuard } from '@nestjs/passport';

/**
 * Description: This guard is used to verify the JWT token.
 *
 * @class JwtGuard
 */
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}
