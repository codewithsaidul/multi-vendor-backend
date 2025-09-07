import { JwtPayload } from "jsonwebtoken";
import { IVendor } from "./vendor.interface";
import Vendor from "./verdor.modal";
import { UserRole } from "../user/user.interface";
import { AppError } from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";

const createNewVendor = async (payload: Partial<IVendor>, user: JwtPayload) => {
  if (user.role === UserRole.ADMIN) {
    payload.status = payload.status || "approved";
  }

  const createVendor = await Vendor.create(payload);

  return createVendor;
};

const getAllVendor = async () => {
  const getVendorList = await Vendor.find();

  return getVendorList;
};

const updateVendorStatus = async (
  vendorId: string,
  user: JwtPayload,
  payload: Partial<IVendor>
) => {
  if (user.role !== UserRole.ADMIN) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized to update vendor status");
  }

  const updateVendorStatus = await Vendor.findByIdAndUpdate(vendorId, payload, {
    new: true,
    runValidators: true,
  });
  return updateVendorStatus;
};

export const VendorServices = {
  getAllVendor,
  createNewVendor,
  updateVendorStatus,
};
