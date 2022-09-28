import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import HttpError from "../utils/HttpError";

const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error();
    const decodedToken = jwt.verify(token, process.env.JWT_KEY!) as {
      uid: string;
      email: string;
    };
    (req as any).uid = { userId: decodedToken.uid };
    next();
  } catch (error) {
    return next(new HttpError("Authentication failed!", 403));
  }
};

export default jwtAuth;
