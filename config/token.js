import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "sprint10-dev-secret";

export const genToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log("Error in generating token:", error);
    throw error;
  }
};
