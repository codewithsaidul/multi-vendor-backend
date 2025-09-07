import { JwtPayload } from "jsonwebtoken";
import { IProduct } from "./product.interface";
import { UserRole } from "../user/user.interface";
import Product from "./product.modal";
import { QueryBuilder } from "../../utils/queryBuilder";
import { productSearchableFields } from "./product.constatns";
import { AppError } from "../../errorHelper/AppError";
import { StatusCodes } from "http-status-codes";

const createProductInDB = async (
  product: Partial<IProduct>,
  user: JwtPayload
) => {
  product.ownerId = user.userId;

  // If the creator is a manager or user, automatically set vendorId from their scope
  if (user.role === UserRole.MANAGER || user.role === UserRole.USER) {
    product.vendorId = user.scopeId;
  }

  // If the creator is an admin, they must provide a vendorId
  if (user.role === UserRole.ADMIN && !product.vendorId) {
    throw new Error("Admin must provide a vendorId when creating a product.");
  }

  const result = await Product.create(product);
  return result;
};

const getAllProductsFromDB = async (
  user: JwtPayload,
  query: Record<string, string>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseFilter: any = {};

  if (user.role === "manager") {
    baseFilter.vendorId = user.scopeId;
  }

  // Starting Mongoose Query with primary filter
  const productQuery = Product.find(baseFilter)
    .populate("vendorId")
    .populate("ownerId", "-password");
  //   Create a QueryBuilder instance with the User model and the query
  const queryBuilder = new QueryBuilder(productQuery, query);

  //   Apply filters, search, sort, fields, and pagination using the QueryBuilder methods
  const users = queryBuilder
    .search(productSearchableFields)
    .sort()
    .fields()
    .paginate();

  //  Execute the query and get the data and metadata
  const [data, meta] = await Promise.all([
    users.build().select("-password -auths"),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};



const updateProduct = async (
  productId: string,
  updateData: Partial<IProduct>,
  user: JwtPayload
) => {
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }


  if (user.role !== UserRole.ADMIN) {
    if (user.role === UserRole.MANAGER) {
      // manager can update only products of their vendor
      if (isProductExist.vendorId.toString() !== user.scopeId) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'You are not authorized to update this product'
        );
      }
    } else if (user.role === 'user') {
      // user can update only their own products
      if (isProductExist.ownerId.toString() !== user.id) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'You can only update your own products'
        );
      }
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateData,
    { new: true, runValidators: true }
  );

  return updatedProduct;
};



const deleteProduct = async (productId: string, user: JwtPayload) => {
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Product not found");
  }

  if (user.role !== UserRole.ADMIN) {
    if (user.role === UserRole.MANAGER) {
      // manager can delete only products of their vendor
      if (isProductExist.vendorId.toString() !== user.scopeId) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'You are not authorized to delete this product'
        );
      }
    } else if (user.role === 'user') {
      // user can delete only their own products
      if (isProductExist.ownerId.toString() !== user.id) {
        throw new AppError(
          StatusCodes.FORBIDDEN,
          'You can only delete your own products'
        );
      }
    }
  }

  await Product.findByIdAndDelete(productId);
};

export const ProductService = {
  createProductInDB,
  getAllProductsFromDB,
  updateProduct,
  deleteProduct
};
