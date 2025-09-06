import { Schema, model, Document } from 'mongoose';
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
      enum: ['pending', 'approved', 'rejected'], // status must be one of these values
      default: 'pending', // By default, a new vendor is pending approval
    },
  },
  {
    // Add createdAt and updatedAt fields automatically
    timestamps: true,
  }
);

const Vendor = model<IVendor>('Vendor', vendorSchema);

export default Vendor;