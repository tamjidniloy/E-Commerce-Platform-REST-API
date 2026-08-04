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
import {ProductListByBrand} from "../app/controllers/ProductController.js";


//Users API
router.post("/Login", UsersController.Login)
router.post("/Verification", UsersController.Verification)
router.post("/CreateUserProfile", UsersController.CreateUserProfile)
router.post("/UpdateUserProfile", UsersController.UpdateUserProfile)
router.get("/ReadUserProfile", UsersController.ReadUserProfile)


//Brands API
router.get("/BrandList", BrandController.BrandList)


//Categories API
router.get("/CategoryList", CategoryController.CategoryList)


//Cart API
router.post("/CreateCart", CartListController.CreateCart)
router.get("/ReadCartList", CartListController.ReadCartList)
router.post("/UpdateCart", CartListController.UpdateCart)
router.get("/RemoveCart", CartListController.RemoveCart)


//Wish API
router.post("/CreateWish", WishListController.CreateWish)
router.get("/ReadWishList", WishListController.ReadWishList)
router.post("/UpdateWish", WishListController.UpdateWish)
router.post("/RemoveWish", WishListController.RemoveWish)


//Products API
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory)
router.get("/ProductListByRemark", ProductController.ProductListByRemark)
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand)
router.get("/ProductListBySlider", ProductController.ProductListBySlider)
router.get("/ProductDetailsID", ProductController.ProductDetailsID)
router.get("/ProductListByKeyword", ProductController.ProductListByKeyword)
router.get("/ProductReviewListById", ProductController.ProductReviewListById)
router.post("/CreateProductReview", ProductController.CreateProductReview)


//Invoice API
router.post("/CreateInvoice", InvoiceController.CreateInvoice)
router.get("/ReadInvoiceList", InvoiceController.ReadInvoiceList)
router.get("/ReadInvoiceDetails", InvoiceController.ReadInvoiceDetails)


export default router;