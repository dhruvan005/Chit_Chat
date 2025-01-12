import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const secretKey = process.env.JWT_SECRET_KEY;
    // console.log("authHeader : ", authHeader);
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Extract the token from 'Bearer <token>'
    // console.log("token in auth" , token);
    if (!token) return res.status(401).json({ message: "Unauthenticated" });

    // Verify token
  
    const decoded = await jwt.verify(token, secretKey);

    req.user = decoded;
    // console.log("req.user in auth" , req.user);

    // console.log("Decoded token:", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.id = decoded._id;
    // console.log("req.id in auth" , req.id);
    next();
  } catch (error) {
    console.log("Error in isAuthenticated:", error);
    return res.status(500).json({ message: "Please Login Again" });
  }
};

export default isAuthenticated;
