import { envVars } from "../config/env";
import bcrypt from "bcrypt";
import User from "../modules/user/user.modal";
import { IUser, UserRole } from "../modules/user/user.interface";
import Vendor from "../modules/vendor/verdor.modal";

export const seedManager = async () => {
  try {
    const isManagerExist = await User.findOne({ role: UserRole.MANAGER });

    if (isManagerExist) {
      console.log("Manager already exists.");
      return null;
    }

    const hashPassword = await bcrypt.hash(
      envVars.MANAGER_PASSWORD as string,
      parseInt(envVars.BCRYPT_SALT_ROUND as string)
    );


    const demoVendor = new Vendor({
      name: 'Demo Vendor Shop',
      status: 'approved',
    });
    const createdVendor = await demoVendor.save();

    const managerInfo: IUser = {
      email: envVars.MANAGER_EMAIL,
      password: hashPassword,
      role: UserRole.MANAGER,
      scopeId: createdVendor._id,
    };

    await User.create(managerInfo);

    console.log("Manager seeded successfully.");
  } catch (error) {
    console.log(error);
  }
};
