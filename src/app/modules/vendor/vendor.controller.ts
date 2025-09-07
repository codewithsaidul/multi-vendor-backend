/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { VendorServices } from "./vendor.service";
import { catchAsync } from "../../utils/catchAsync";
import { TNext, TRequest, TResponse } from "../../types/global";
import { JwtPayload } from "jsonwebtoken";

const createNewVendor = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const user = req.user as JwtPayload;
    const vendor = await VendorServices.createNewVendor(req.body, user);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Vendor created successfully",
      data: vendor,
    });
  }
);


const getAllVendor = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const vendor = await VendorServices.getAllVendor();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vendor list retrive successfully",
      data: vendor,
    });
  }
);

export const VendorController = {
  getAllVendor, createNewVendor
};
