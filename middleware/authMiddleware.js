import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "sprint10-dev-secret";

export const protect = (req, res, next) => {
  try {

    const token = req.cookies?.token;


    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);


    req.userId = decoded.userId;

    next();
  } catch (error) {

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
