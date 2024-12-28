import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthenticated" });
        }
        const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET
        const decoded = await jwt.verify(token, secretKey)
        // console.log("decode" , decoded);

        if (!decoded) {

            return res.status(401).json({ message: "Invalid Token" });
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
        console.log("Error in isAuthenticated ", error);
        return res.status(500).json({ message: "Please Login Again" });
    }
}

export default isAuthenticated;