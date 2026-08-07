import jwt from "jsonwebtoken";

// JWT Secret Key
const JWT_SECRET =
  process.env.JWT_SECRET || "sprint10-dev-secret";

// Protect Private Routes
export const protect = (req, res, next) => {
  try {

    // Get token from cookies
    const token = req.cookies?.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Store logged-in user id in request
    req.userId = decoded.userId;

    // Move to next middleware
    next();

  } catch (error) {

    console.log("Authentication Error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });

  }
};
