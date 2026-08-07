import jwt from "jsonwebtoken";

// JWT Secret Key
export const JWT_SECRET =
  process.env.JWT_SECRET || "sprint10-dev-secret";

// Generate JWT Token
export const genToken = (userId) => {
  try {
    // Create token with userId
    const token = jwt.sign(
      { userId },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return token;
  } catch (error) {
    // Log token generation error
    console.log("Error in generating token:", error);

    throw error;
  }
};
