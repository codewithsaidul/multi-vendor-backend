/* eslint-disable no-console */
import bcrypt from "bcrypt";
import User from "../modules/user/user.modal";
import { envVars } from "../config/env";
import Vendor from "../modules/vendor/verdor.modal";
import { IUser, UserRole } from "../modules/user/user.interface";



export const seedManager = async () => {
  try {
    const isManagerExist = await User.findOne({ email: envVars.MANAGER_EMAIL });

    if (isManagerExist) {
      console.log("Manager already exists.");
      return;
    }

    let vendorDoc = await Vendor.findOne({ name: "Demo Vendor Shop" });


    if (!vendorDoc) {
      console.log("Demo vendor not found, creating new one...");
      const demoVendor = new Vendor({
        name: "Demo Vendor Shop",
        status: "approved",
      });
      vendorDoc = await demoVendor.save();
    }

    const hashPassword = await bcrypt.hash(
      envVars.MANAGER_PASSWORD as string,
      parseInt(envVars.BCRYPT_SALT_ROUND as string)
    );

    const managerInfo: Partial<IUser> = {
      email: envVars.MANAGER_EMAIL,
      password: hashPassword,
      role: UserRole.MANAGER,
      scopeId: vendorDoc?._id,
    };

    await User.create(managerInfo);

    console.log("Manager seeded successfully.");
  } catch (error) {
    console.log(error);
  }
};