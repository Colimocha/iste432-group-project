import { AuthGuard } from '@nestjs/passport';

/**
 * Author: Xiangyu Shi
 * Description: This guard is used to verify the JWT token.
 */
export class SocietyContactJwtGuard extends AuthGuard('societyContact') {
  constructor() {
    super();
  }
}
