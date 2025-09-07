import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./jwt";
import User from "../modules/user/user.modal";
import { AppError } from "../errorHelper/AppError";



export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
    scopeId: user.scopeId
  };

  // genrate access tokens
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT.JWT_ACCESS_SECRET,
    envVars.JWT.JWT_ACCESS_EXPIRATION_TIME
  );

  // genrate  refresh tokens
  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT.JWT_REFRESH_SECRET,
    envVars.JWT.JWT_REFRESH_EXPIRATION_TIME
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const createAccessTokenWithRefreshToken = async (
  refreshToken: string
) => {
  // verify the refresh token
  const verifyrefreshToken = jwt.verify(
    refreshToken,
    envVars.JWT.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifyrefreshToken.email });

  // if user does not exist
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "user does not exist");
  }

  // create jwt payload
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
    scopeId: isUserExist.scopeId
  };
  // genrate access tokens
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT.JWT_ACCESS_SECRET,
    envVars.JWT.JWT_ACCESS_EXPIRATION_TIME
  );

  return accessToken;
};
