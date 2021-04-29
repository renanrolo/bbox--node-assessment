import { Request, Response } from "express";
import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import User from "../entity/User";
import Project from "../entity/Project";
import { ProjectRequestBody } from "./project.request.body";

interface CustomRequest<T> extends Request {
    body: T;
}

exports.post = async ({ body }: CustomRequest<ProjectRequestBody>, res: Response, next) => {
    try {
        const uuid = uuidv4();

        const user: User = await User.findOne({ uuid: body.userId });

        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }

        const project: Project = Project.create({
            uuid,
            description: body.description,
            owner: user,
            creationDate: new Date(),
        });

        await project.save();

        res.status(201).json({ id: uuid });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req: Request, res: Response, next) => {
    try {
        const { userId } = req.query;

        let projects: Project[];

        if (userId) {
            projects = await Project.find({ where: { owner: userId } });
        }
        else {
            projects = await Project.find();
        }

        res.status(200).json(projects);
    }
    catch (err) {
        next(err);
    }
};

exports.getOne = async (req: Request, res: Response, next) => {
    try {
        const { projectId } = req.params;

        const projects: Project = await Project.findOne({
            where: { uuid: projectId },
        });

        if (projects) {
            res.status(200).json(projects);
        } else {
            res.status(404).json({ message: "Project not found!" });
        }
    }
    catch (err) {
        next(err);
    }
};

exports.delete = async (req: Request, res: Response, next) => {
    try {
        const { projectId } = req.params;

        const project: Project = await Project.findOne({
            where: { uuid: projectId },
        });

        if (project) {
            Project.delete(project);
        }

        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};