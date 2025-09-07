import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken';



export type TRequest = Request;
export type TResponse = Response;
export type TNext = NextFunction;



declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | {
        userId: string;
        email: string;
        role: string;
        scopeId?: string;
      };
    }
  }
}

