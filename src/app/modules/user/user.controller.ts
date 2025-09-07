/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";





const assignToManager = catchAsync(async (req: TRequest, res: TResponse, next: TNext) => {
    const { scopeId } = req.body;
    const { userId } = req.params;
    const adminUser = req.user as JwtPayload;

    const updatedUser = await UserService.assignToManager(adminUser, userId, scopeId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User assigned to manager successfully.",
        data: updatedUser
    })
});



export const UserController = {
    assignToManager
}   