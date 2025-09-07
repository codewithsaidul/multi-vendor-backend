import { JwtPayload } from "jsonwebtoken";
import { IUser, UserRole } from "./user.interface";
import User from "./user.modal";
import { AppError } from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";

const createNewUser = async (
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  if (decodedToken.role !== UserRole.ADMIN) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Only admins can create new users."
    );
  }

  const isUserExist = await User.findOne( { email: payload.email } );
  if (isUserExist) {
    throw new AppError(StatusCodes.CONFLICT, "User already exists.");
  }

    const newUser = await User.create(payload);
    return newUser;
};

const assignToManager = async (
  adminUser: JwtPayload,
  userId: string,
  scopeId: string
) => {
  if (adminUser.role !== UserRole.ADMIN) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Only admins can assign users to managers."
    );
  }

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found.");
  }

  if (isUserExist && isUserExist.role !== UserRole.USER) {
    throw new AppError(StatusCodes.FORBIDDEN, "User is not a regular user.");
  }

  // Assign user to manager
  const payload = {
    role: UserRole.MANAGER,
    scopeId,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
  return updatedUser;
};

export const UserService = {
 createNewUser, assignToManager,
};
