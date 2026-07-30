import express from "express";
const router = express.Router();
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js"
import * as UsersController from "../app/controllers/UsersController.js"
import * as BrandController from "../app/controllers/BrandController.js"
import * as CartListController from "../app/controllers/CartListController.js"
import * as CategoryController from "../app/controllers/CategoryController.js"
import * as InvoiceController from "../app/controllers/InvoiceController.js"
import * as ProductController from "../app/controllers/ProductController.js"
import * as WishListController from "../app/controllers/WishListController.js"


//Users API
router.post("/Login", UsersController.Login)
router.post("/Verification", UsersController.Verification)
router.post("/CreateUserProfile", UsersController.CreateUserProfile)
router.post("/UpdateUserProfile", UsersController.UpdateUserProfile)
router.post("/ReadUserProfile", UsersController.ReadUserProfile)


//Brands API
router.post("/BrandList", BrandController.BrandList)


//Categories API
router.post("/CategoryList", CategoryController.CategoryList)


//Cart API
router.post("/CreateCart", CartListController.CreateCart)
router.post("/ReadCartList", CartListController.ReadCartList)
router.post("/UpdateCart", CartListController.UpdateCart)
router.post("/RemoveCart", CartListController.RemoveCart)


//Wish API
router.post("/CreateWish", WishListController.CreateWish)
router.post("/ReadWishList", WishListController.ReadWishList)
router.post("/UpdateWish", WishListController.UpdateWish)
router.post("/RemoveWish", WishListController.RemoveWish)


//Product API
router.post("/ProductListByCategory", ProductController.ProductListByCategory)
router.post("/ProductListByRemark", ProductController.ProductListByRemark)
router.post("/ProductListByBrand", ProductController.ProductListByBrand)
router.post("/ProductListBySlider", ProductController.ProductListBySlider)
router.post("/ProductDetailsID", ProductController.ProductDetailsID)
router.post("/ProductListByKeyword", ProductController.ProductListByKeyword)
router.post("/ProductReviewListById", ProductController.ProductReviewListById)
router.post("/CreateProductReview", ProductController.CreateProductReview)


//Invoice API
router.post("/CreateInvoice", InvoiceController.CreateInvoice)
router.post("/ReadInvoiceList", InvoiceController.ReadInvoiceList)
router.post("/ReadInvoiceDetails", InvoiceController.ReadInvoiceDetails)


export default router;