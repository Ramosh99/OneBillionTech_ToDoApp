import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "Please login first",
      });
    }

    if (!jwt.verify(token, process.env.JWT_SECRET)) {
      return res.status(401).json({
        status: "Failed",
        message: "Invalid token",
      });
    }
    req.decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();//function that calls the next middleware in the stack
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid token",
    });
  }
};

export default protect;

// Intercepts incoming requests
// Extracts the JWT token from Authorization header
// Verifies the token's validity using JWT_SECRET
// Adds decoded user data to the request object
// Either allows the request to continue or returns an error