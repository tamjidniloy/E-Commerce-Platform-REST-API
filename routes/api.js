import express from "express";
import {PaymentIPN} from "../app/controllers/InvoiceController.js";
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
router.post("/CreateUserProfile",AuthMiddleware, UsersController.CreateUserProfile)
router.post("/UpdateUserProfile",AuthMiddleware, UsersController.UpdateUserProfile)
router.get("/ReadUserProfile",AuthMiddleware, UsersController.ReadUserProfile)


//Brands API
router.get("/BrandList", BrandController.BrandList)


//Categories API
router.get("/CategoryList", CategoryController.CategoryList)


//Cart API
router.post("/CreateCart",AuthMiddleware, CartListController.CreateCart)
router.get("/ReadCartList",AuthMiddleware, CartListController.ReadCartList)
router.get("/UpdateCart",AuthMiddleware, CartListController.UpdateCart)
router.post("/RemoveCart",AuthMiddleware, CartListController.RemoveCart)


//Review
router.post("/CreateUserReview",AuthMiddleware, UsersController.CreateUserReview)
router.post("/UpdateUserReview",AuthMiddleware, UsersController.UpdateUserReview)

//Wish API
router.post("/CreateWish",AuthMiddleware ,WishListController.CreateWish)
router.get("/ReadWishList",AuthMiddleware, WishListController.ReadWishList)
router.post("/RemoveWish",AuthMiddleware, WishListController.RemoveWish)


//Products API
router.get("/ProductListByCategory/:CategoryID", ProductController.ProductListByCategory)
router.get("/ProductListByRemark/:Remark", ProductController.ProductListByRemark)
router.get("/ProductListByBrand/:BrandID", ProductController.ProductListByBrand)
router.get("/ProductListBySlider", ProductController.ProductListBySlider)
router.get("/ProductDetailsID/:ProductID", ProductController.ProductDetailsID)
router.get("/ProductListByKeyword/:keyword", ProductController.ProductListByKeyword)
router.get("/ProductReviewListById/:ProductID", ProductController.ProductReviewListById)
router.post("/CreateProductReview", ProductController.CreateProductReview)


//Invoice API
router.post("/CreateInvoice",AuthMiddleware, InvoiceController.CreateInvoice)
router.post("/PaymentSuccess/:trxID",AuthMiddleware, InvoiceController.PaymentSuccess)
router.post("/PaymentCancel/:trxID",AuthMiddleware, InvoiceController.PaymentCancel)
router.post("/PaymentFail/:trxID",AuthMiddleware, InvoiceController.PaymentFail)
router.post("/PaymentIPN/:trxID",AuthMiddleware, InvoiceController.PaymentIPN)
router.get("/ReadInvoiceList",AuthMiddleware, InvoiceController.ReadInvoiceList)
router.get("/ReadInvoiceDetails",AuthMiddleware, InvoiceController.ReadInvoiceDetails)


export default router;