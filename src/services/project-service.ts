import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '../services/user-service';
import { UserNotFound } from '../exceptions/user-not-found';
import { ProjectNotFound } from '../exceptions/project-not-found';
import User from '../entities/user';
import Project from '../entities/project';

export class ProjectService {

    static async Find(userId, projectId): Promise<Project> {
        await ProjectService.CheckIfUserExists(userId);

        const project = await this.FindProject(userId, projectId, true);

        return project;
    }

    static async List(userId): Promise<Project[]> {
        await ProjectService.CheckIfUserExists(userId);

        const query = {
            where: {
                owner: {
                    uuid: userId
                }
            }
        }

        return await Project.find(query);
    }

    static async Create(userId, project): Promise<Project> {
        await ProjectService.CheckIfUserExists(userId);

        const createdProject: Project = Project.create({
            uuid: uuidv4(),
            description: project.description,
            owner: userId,
            creationDate: new Date(),
        });

        await createdProject.save();

        return createdProject;
    }

    static async Edit(userId, projectId, editProject): Promise<Project> {
        await ProjectService.CheckIfUserExists(userId);

        const project: Project = await this.FindProject(userId, projectId, true)

        const editedProject = { ...project, ...editProject };

        await Project.update(project.uuid, editedProject);

        return editedProject;
    }

    static async Remove(userId, projectId) {
        await ProjectService.CheckIfUserExists(userId);

        const project: Project = await this.FindProject(userId, projectId)

        if (project) {
            console.log('Project deleted:', project);
            Project.delete(project);
        } else {
            console.log('Project not found or already deleted:', projectId);
        }
    }

    private static async CheckIfUserExists(userId: any) {
        const user: User = await UserService.Find(userId);

        if (!user) {
            throw new UserNotFound();
        }
    }

    private static async FindProject(
        userId: any,
        projectId: any,
        shouldThrowException: boolean = false): Promise<Project> {
        const query = {
            where: {
                uuid: projectId,
                owner: {
                    uuid: userId
                }
            }
        }

        const project: Project = await Project.findOne(query);

        if (!project && shouldThrowException) {
            throw new ProjectNotFound();
        }

        return project;
    }
}