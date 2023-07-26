const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const checkLoginStatus = (req, res) => {
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
    return res.status(200).json({ message: "SUCCESS" });
    // req.user = decoded;
    // next();
  });
};

module.exports = checkLoginStatus;
