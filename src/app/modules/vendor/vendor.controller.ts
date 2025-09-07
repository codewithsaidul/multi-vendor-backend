
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
    const query = req.query as Record<string, string>;
    const vendor = await VendorServices.getAllVendor(query);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vendor list retrive successfully",
      data: vendor,
    });
  }
);


const updateVendorStatus = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const { vendorId } = req.params;
    const user = req.user as JwtPayload;
    const vendor = await VendorServices.updateVendorStatus(vendorId, user, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vendor Status updated successfully",
      data: vendor,
    });
  }
);



const updateVendorInfo = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const { vendorId } = req.params;
    const user = req.user as JwtPayload;
    const vendor = await VendorServices.updateVendorInfo(vendorId, user, req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Vendor Info updated successfully",
      data: vendor,
    });
  }
);

export const VendorController = {
  getAllVendor, createNewVendor, updateVendorStatus, updateVendorInfo
};
