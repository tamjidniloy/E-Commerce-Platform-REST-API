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
        return res.status(200).json(result);
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
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const ReadUserProfile=async(req,res)=>{
    try {
        let result = await UserReadProfileService(req);
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}


export const UpdateUserProfile=async(req,res)=>{
    try {
        let result = await UserUpdateProfileService(req);
        return res.status(200).json({ status:"success", message:""});
    }catch (error) {
        return res.status(500).json({ status:"error", error: error.toString() });
    }
}








