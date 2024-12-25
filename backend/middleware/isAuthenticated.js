import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthenticated")
        }
        const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET
        const decoded = await jwt.verify(token, secretKey )
        // console.log("decode" , decoded);

        if (!decoded) {
            throw new ApiError(401, "Invalid Token")
        }
        req.id = decoded._id;
        // console.log("id" , req.id);
        next()
        // return res.status(200).json({
        //     message: "User authenticated successfully",
        //     id: decoded.userId,
        //     email: decoded.email
        // })

        
        
    } catch (error) {
        console.log("Error in isAuthenticated " , error);
    }
}

export default isAuthenticated;