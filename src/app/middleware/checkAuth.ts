import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { TNext, TRequest, TResponse } from "../types/global";
import { verifyToken } from "./../utils/jwt";
import { AppError } from "../errorHelper/AppError";
import User from "../modules/user/user.modal";


export const checkAuth =
  (...authRoles: string[]) =>
  async (req: TRequest, res: TResponse, next: TNext) => {
    // get the access token from the request headers
    const accessToken = req.headers.authorization || req.cookies.accessToken;

    // if the access token is not present, throw an error
    if (!accessToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Access token is missing");
    }

    // verify the access token
    const verifiedToken = verifyToken(
      accessToken,
      envVars.JWT.JWT_ACCESS_SECRET
    ) as JwtPayload;

    // if the token is not verified
    if (!verifiedToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid access token");
    }

    // check if the user's role is allowed to access the resource
    if (!authRoles.includes(verifiedToken.role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "You do not have permission to access this resource"
      );
    }

    // get the user
    const isUserExist = await User.findOne({ email: verifiedToken.email });

    // if the user does not exist, throw an error
    if (!isUserExist) {
      throw new AppError(StatusCodes.NOT_FOUND, "User does not exist");
    }



    req.user = verifiedToken;

    next();
  };