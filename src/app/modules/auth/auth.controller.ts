import { StatusCodes } from "http-status-codes";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";

// This function handles user login using credentials (email and password).
const credentialsLogin = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const payload = req.body;
    const result = await AuthServices.credentialsLogin(payload);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User logged in successfully",
      data: {
        user: result.user,
      },
    });
  }
);




export const AuthController = {
    credentialsLogin
}