import 'reflect-metadata';
import { Request, Response } from 'express';
import { CreateUserRequest } from '../models/create-user-request';
import { UserService } from '../services/user-service'
import { CustomRequest } from '../models/custom-request';
import User from '../entities/user';

async function create({ body }: CustomRequest<CreateUserRequest>, res: Response, next) {
    try {
        const user = await UserService.Create(body);

        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};

async function edit(req, res, next) {
    try {
        const user: User = await UserService.Edit(req.params.userId, req.body);

        return res.status(200).send(user);
    }
    catch (err) {
        next(err);
    }
};

async function remove(req: Request, res: Response, next) {
    try {
        UserService.Remove(req.params.userId);

        return res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};

async function list(req: Request, res: Response, next) {
    try {
        const users = await UserService.List();

        return res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
};

async function find(req: Request, res: Response, next) {
    try {
        const user: User = await UserService.Find(req.params.userId);

        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
};

export default { create, edit, remove, list, find }