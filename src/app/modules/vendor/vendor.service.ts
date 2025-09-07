import Vendor from "./verdor.modal";

const getAllVendor = async () => {
  const getVendorList = await Vendor.find();

  return getVendorList;
};

export const VendorServices = {
  getAllVendor,
};
