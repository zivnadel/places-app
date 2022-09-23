import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { v4 as uuidv4 } from "uuid";

import HttpError from "../models/HttpErrorModel";

const DUMMY_USERS: any = [
  {
    id: "u1",
    name: "zivziv",
    image:
      "https://images.unsplash.com/photo-1662496167579-675de58d766a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    places: 3,
  },
];

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ users: DUMMY_USERS });
};

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid input passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u: any) => u.email === email);

  if (hasUser) {
    return next(
      new HttpError("Could not create user, email already exists.", 422)
    );
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res
    .status(201)
    .json({ message: "Successfully created a new user!", createdUser });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const indenitifiedUser = DUMMY_USERS.find((u: any) => u.email === email);

  if (!indenitifiedUser || indenitifiedUser.password !== password) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        401
      )
    );
  }

  res.json({ message: "Logged In!" });
};
