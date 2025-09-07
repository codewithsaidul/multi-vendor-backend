import { JwtPayload } from "jsonwebtoken";
import { IVendor } from "./vendor.interface";
import Vendor from "./verdor.modal";
import { UserRole } from "../user/user.interface";
import { AppError } from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";
import { QueryBuilder } from "../../utils/queryBuilder";
import { vendorSearchableFields } from "./vendor.constants";

const createNewVendor = async (payload: Partial<IVendor>, user: JwtPayload) => {
  if (user.role === UserRole.ADMIN) {
    payload.status = payload.status || "approved";
  }

  const createVendor = await Vendor.create(payload);

  return createVendor;
};

const getAllVendor = async (query: Record<string, string>) => {
  //   Create a QueryBuilder instance with the User model and the query
  const queryBuilder = new QueryBuilder(Vendor.find(), query);

  //   Apply filters, search, sort, fields, and pagination using the QueryBuilder methods
  const vendor = queryBuilder
    .search(vendorSearchableFields)
    .sort()
    .fields()
    .paginate();

  //  Execute the query and get the data and metadata
  const [data, meta] = await Promise.all([
    vendor.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
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
