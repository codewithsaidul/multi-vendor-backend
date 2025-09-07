/* eslint-disable no-console */
import { envVars } from "../config/env";
import bcrypt from "bcrypt";
import User from "../modules/user/user.modal";
import { IUser, UserRole } from "../modules/user/user.interface";
import Vendor from "../modules/vendor/verdor.modal";

export const seedUser = async () => {
  try {
    const isUserExist = await User.findOne({ role: UserRole.USER });

    if (isUserExist) {
      console.log("User already exists.");
      return null;
    }

    const hashPassword = await bcrypt.hash(
      envVars.USER_PASSWORD as string,
      parseInt(envVars.BCRYPT_SALT_ROUND as string)
    );

    let vendorDoc = await Vendor.findOne({ name: "Demo Vendor Shop" });


    if (!vendorDoc) {
      console.log("Demo vendor not found, creating new one...");
      const demoVendor = new Vendor({
        name: "Demo Vendor Shop",
        status: "approved",
      });
      vendorDoc = await demoVendor.save();
    }

    const userInfo: IUser = {
      email: envVars.USER_EMAIL,
      password: hashPassword,
      role: UserRole.USER,
      scopeId: vendorDoc?._id,
    };

    await User.create(userInfo);

    console.log("User seeded successfully.");
  } catch (error) {
    console.log(error);
  }
};
