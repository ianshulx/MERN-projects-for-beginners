const jwt = require("jsonwebtoken");

const UserAuth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access denied" });
  }

  try {
    const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokendecode.id) {
      req.body.userId = tokendecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = UserAuth;
