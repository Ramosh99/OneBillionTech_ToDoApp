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
    next();
  } catch (err) {
    res.status(401).json({
      status: "Failed",
      message: "Invalid token",
    });
  }
};

export default protect;
