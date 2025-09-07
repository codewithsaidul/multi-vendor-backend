/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import { createUserToken } from "../../utils/userToken";

// This function handles user login using credentials (email and password).
const credentialsLogin = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const payload = req.body;
    const user = await AuthServices.credentialsLogin(payload);

    const { accessToken } = createUserToken(user)

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User logged in successfully",
      data: {
        token: accessToken,
        user: {
          _id: user._id,
          role: user.role,
          scopeId: user.scopeId
        },
      },
    });
  }
);




export const AuthController = {
    credentialsLogin
}