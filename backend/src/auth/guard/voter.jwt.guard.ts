import { AuthGuard } from '@nestjs/passport';

/**
 * Author: Xiangyu Shi
 * Description: This guard is used to verify the JWT token.
 */
export class VoterJwtGuard extends AuthGuard('voter') {
  constructor() {
    super();
  }
}
