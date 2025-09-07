import { Schema, model } from 'mongoose';
import { IVendor } from './vendor.interface';


// 2. Create a Schema corresponding to the document interface.
const vendorSchema = new Schema<IVendor>(
  {
    name: {
      type: String,
      required: [true, 'Vendor name is required'],
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Vendor = model<IVendor>('Vendor', vendorSchema);

export default Vendor;