import { JwtPayload } from "jsonwebtoken";
import { IUser, UserRole } from "./user.interface";
import User from "./user.modal";
import { AppError } from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import { QueryBuilder } from "../../utils/queryBuilder";
import { userSearchableFields } from "./user.constants";

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


const getAllUsers = async (query: Record<string, string>) => {

  //   Create a QueryBuilder instance with the User model and the query
  const queryBuilder = new QueryBuilder(User.find(), query);

  //   Apply filters, search, sort, fields, and pagination using the QueryBuilder methods
  const users = queryBuilder
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();

  //  Execute the query and get the data and metadata
  const [data, meta] = await Promise.all([
    users.build().select("-password"),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
}

export const UserService = {
 createNewUser, assignToManager, getAllUsers
};
