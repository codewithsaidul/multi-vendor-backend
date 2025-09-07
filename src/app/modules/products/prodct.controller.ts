/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtPayload } from "jsonwebtoken";
import { TNext, TRequest, TResponse } from "../../types/global";
import { catchAsync } from "../../utils/catchAsync";
import { ProductService } from "./products.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


// Create a product
const createProductInDB = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const decodedToken = req.user as JwtPayload;
    const result = await ProductService.createProductInDB(
      req.body,
      decodedToken
    );

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Product created successfully",
      data: result,
    });
  }
);



//  Get all products
const getAllProducts = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const query = req.query as Record<string, string>;
    const user = req.user as JwtPayload;
    const result = await ProductService.getAllProductsFromDB(user, query);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Products retrieved successfully",
      data: result,
    });
  }
);


// Update a product
const updateProduct = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const { productId } = req.params;
    const updateData = req.body;
    const user = req.user as JwtPayload;
    const result = await ProductService.updateProduct(productId, updateData, user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  }
);


// Delete a product
const deleteProduct = catchAsync(
  async (req: TRequest, res: TResponse, next: TNext) => {
    const { productId } = req.params;
    const user = req.user as JwtPayload;
    await ProductService.deleteProduct(productId, user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  }
);

export const ProductController = {
  createProductInDB, getAllProducts, updateProduct, deleteProduct
};
