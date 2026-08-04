import {
    UserCreatProfileService,
    UserLoginService, UserReadProfileService,
    UserUpdateProfileService,
    UserVerificationService
} from "../service/UserService.js";


export const Login = async (req, res) => {
    try {
        const result = await UserLoginService(req);
        if (result.status === "error") {
            return res.status(400).json(result);
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({status: "error", message: error.message});
    }
};



export const Verification = async (req, res) => {
    try {
        const result = await UserVerificationService(req);
        if (result.status === "error") {
            return res.status(400).json(result);
        }
        return res.status(200).json({status: "success", message: "Verification successful", data: result});
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error.message
        });
    }
};



export const CreateUserProfile=async(req,res)=>{
    try {
        let result = await UserCreatProfileService(req);
        if (result.status === "error") {
            return res.status(400).json(result);
        }
        return res.status(200).json({status: "success", message: "Profile Creation successful", data: result});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ReadUserProfile=async(req,res)=>{
    try {
        let result = await UserReadProfileService(req);
        if (result.status === "error") {
            return res.status(400).json(result);
        }
        return res.status(200).json({status: "success", message: "Profile read successful", data: result});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const UpdateUserProfile=async(req,res)=>{
    try {
        let result = await UserUpdateProfileService(req);
        if (result.status === "error") {
            return res.status(400).json(result);
        }
        return res.status(200).json({status: "success", message: "Profile Updated successful", data: result});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}








