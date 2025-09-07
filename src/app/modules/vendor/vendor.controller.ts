/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";
import { VendorServices } from "./vendor.service";
import { catchAsync } from "../../utils/catchAsync";
import { TNext, TRequest, TResponse } from "../../types/global";






const getAllVendor = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {

    const vendor = await VendorServices.getAllVendor();



    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vendor list retrive successfully",
      data: vendor
    });
  }
);



export const VendorController = {
    getAllVendor
}