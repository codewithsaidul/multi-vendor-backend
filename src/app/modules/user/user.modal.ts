import { model, Schema } from "mongoose";
import { IUser, UserRole } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    vendorId: { type: Schema.Types.ObjectId, ref: "Vendor" },
  },
  { timestamps: true, versionKey: false }
);

const User = model<IUser>("User", userSchema);
export default User;
