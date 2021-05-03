import 'reflect-metadata';
import { Request, Response } from 'express';
import { CreateProjectRequest } from '../models/create-project-request';
import { EditProjectRequest } from '../models/edit-project-request';
import { ProjectService } from '../services/project-service'
import { CustomRequest } from '../models/custom-request';
import Project from '../entities/project';

async function create({ body, params }: CustomRequest<CreateProjectRequest>, res: Response, next) {
    try {
        const { userId } = params;

        const project = await ProjectService.Create(userId, body);

        delete project.owner; // There's no need to return owners data

        return res.status(200).json(project);
    } catch (err) {
        next(err);
    }
};

async function list(req: any, res: Response, next) {
    try {
        const projects: Project[] = await ProjectService.List(req.params.userId);

        res.status(200).json(projects);
    }
    catch (err) {
        next(err);
    }
};

async function find(req: any, res: Response, next) {
    try {
        const { projectId, userId } = req.params;

        const project = await ProjectService.Find(userId, projectId);

        return res.status(200).json(project);
    }
    catch (err) {
        next(err);
    }
};

async function remove(req: Request, res: Response, next) {
    try {
        const { projectId, userId } = req.params;

        await ProjectService.Remove(userId, projectId);

        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};

async function edit({ body, params }: CustomRequest<EditProjectRequest>, res: Response, next) {
    try {
        const { projectId, userId } = params;

        const project = await ProjectService.Edit(userId, projectId, body);

        res.status(200).json(project);
    } catch (err) {
        next(err);
    }
};

export default { create, list, find, remove, edit }