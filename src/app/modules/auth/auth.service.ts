import { StatusCodes } from "http-status-codes";
import { AppError } from "../../errorHelper/AppError";
import { IUser } from "../user/user.interface";
import User from "../user/user.modal";
import bcrypt from "bcrypt"





// This function handles user login using credentials (email and password).
const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isUserExist?.password as string
  );

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Incorrect password");
  }

  return {
      id: isUserExist._id,
      role: isUserExist.role,
      scopeId: isUserExist.scopeId
  };
};


export const AuthServices = {
    credentialsLogin
}