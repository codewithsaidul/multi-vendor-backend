
import { JwtPayload } from "jsonwebtoken";
import { IVendor } from "./vendor.interface";
import Vendor from "./verdor.modal";
import { UserRole } from "../user/user.interface";




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

export const VendorServices = {
  getAllVendor, createNewVendor
};
