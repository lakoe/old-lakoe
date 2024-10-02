import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    //Bearer Token Check
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized")
    }

    const token = authHeader.split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.verifiedUser = user;
        console.log('this', user)
        next();
    } catch(err) {
        return res.status(401).json(err.message)
    }
  }
}
