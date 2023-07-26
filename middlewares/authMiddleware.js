const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const authenticateToken = (req, res, next) => {
  const cookieHeader = req.headers.cookie;

  if (!cookieHeader) {
    return res.status(401).json({ message: "Please login to view this page" });
  }

  let token = "";

  const [cookieName, cookieValue] = cookieHeader.trim().split("=");
  if (cookieName === "sessionToken") {
    token = cookieValue;
  }

  if (!token) {
    return res.status(401).json({ message: "No token found, please login." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      if (err.expiredAt) {
        return res.status(403).json({ message: "Session Expired." });
      }
      return res.status(403).json({ message: "Invalid session token." });
    }

    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;

// const jwt = require("jsonwebtoken");
// const secretKey = process.env.JWT_SECRET;

// const authenticateToken = (req, res, next) => {
//   const token = extractTokenFromHeader(req);

//   if (!token) {
//     return res.status(401).json({ message: "No token found. Please login." });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       if (err.name === "TokenExpiredError") {
//         return res
//           .status(403)
//           .json({ message: "Session Expired. Please log in again." });
//       }
//       return res
//         .status(403)
//         .json({ message: "Invalid token. Please log in again." });
//     }

//     req.user = decoded;
//     next();
//   });
// };

// const extractTokenFromHeader = (req) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader && authHeader.startsWith("sessionToken")) {
//     const token = authHeader.substring(13);
//     return token;
//   }
//   return null;
// };

// module.exports = authenticateToken;
