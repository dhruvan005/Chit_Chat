import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token in auth", token);
    console.log("req.cookies", req.cookies);

    if (!token) {
      return res.status(401).json({ message: "Unauthenticated" });
    }
    const secretKey = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.id = decoded._id;
    next();
  } catch (error) {
    console.log("Error in isAuthenticated:", error);
    return res.status(500).json({ message: "Please Login Again" });
  }
};

export default isAuthenticated;