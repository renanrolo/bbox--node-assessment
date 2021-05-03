import { CustomException } from './custom-exception';

class ProjectNotFound extends CustomException {
  constructor() {
    super(404, 'Project not found!');
  }
}

export { ProjectNotFound }