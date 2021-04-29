import { Request, Response } from "express";
import "reflect-metadata";
import { v4 as uuidv4 } from "uuid";
import User, { UserEvent, UserRole } from "../entity/User";
import { UserRequestBody } from "./user.request.body";

interface CustomRequest<T> extends Request {
    body: T;
}

exports.post =
    async ({ body }: CustomRequest<UserRequestBody>, res: Response, next) => {
        try {
            const uuid = uuidv4();

            const user: User = User.create({
                uuid,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                phoneNumber: body.phoneNumber,
                password: body.password,
                role: UserRole.CLIENT,
                creationDate: new Date(),
                currentEvent: UserEvent.CREATION,
            });

            await user.save();

            res.status(201).json({ id: uuid });
        }
        catch (err) {
            next(err);
        }
    };

exports.put = async (req, res, next) => {
    try {
        const user: User = await User.findOne({ uuid: req.params.id });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.password = req.body.password || user.password;

        await user.save();

        let id = req.params.id;
        res.status(201).send(`Requisição recebida com sucesso! ${id}`);
    }
    catch (err) {
        next(err);
    }
};

exports.delete = async (req: Request, res: Response, next) => {
    try {
        const user: User = await User.findOne({ uuid: req.params.id });

        if (user) {
            User.delete(user);
        }

        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
};

exports.getAll = async (req: Request, res: Response, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
};

exports.getOne = async (req: Request, res: Response, next) => {
    try {
        const user: User = await User.findOne({ uuid: req.params.id });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found!" });
        }
    }
    catch (err) {
        next(err);
    }
};
