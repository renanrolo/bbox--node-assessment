import { CustomException } from './custom-exception';

class UserNotFound extends CustomException {
  constructor() {
    super(404, 'User not found!');
  }
}

export { UserNotFound }