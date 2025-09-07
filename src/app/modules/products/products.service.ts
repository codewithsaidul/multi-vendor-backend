import { JwtPayload } from "jsonwebtoken";
import { IProduct } from "./product.interface";
import { UserRole } from "../user/user.interface";
import Product from "./product.modal";
import { QueryBuilder } from "../../utils/queryBuilder";
import { productSearchableFields } from "./product.constatns";

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

const getAllProductsFromDB = async (user: JwtPayload, query: Record<string, string>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const baseFilter: any = {};

  if (user.role === "manager") {
    baseFilter.vendorId = user.scopeId;
  }
  // 'admin' এবং 'user'-এর জন্য baseFilter খালি থাকবে, তাই তারা সব প্রোডাক্ট দেখবে

  // ধাপ ২: প্রাথমিক ফিল্টার দিয়ে Mongoose কোয়েরি শুরু করুন
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

export const ProductService = {
  createProductInDB,
  getAllProductsFromDB,
};
