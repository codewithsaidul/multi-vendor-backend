import { JwtPayload } from "jsonwebtoken";
import { IProduct } from "./product.interface";
import { UserRole } from "../user/user.interface";
import Product from "./product.modal";




const createProductInDB = async (product: Partial<IProduct>, user: JwtPayload) => {
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
}



export const ProductService = {
    createProductInDB
}