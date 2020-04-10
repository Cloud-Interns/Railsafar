const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  //Extract the token from header
  const bearerHeader = req.headers["authorization"];
  let token = "";

  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //split at the space
    const bearer = bearerHeader.split(" ");
    //get token from array
    token = bearer[1];
  } else {
    //forbidden
    res.json({ msg: "error" });
  }

  //Check for the existence of token
  if (!token) {
    return res.status(401).json({ msg: "error" });
  } else {
    try {
      //Verify the token and verify() method gives us the payload which is just userID in our case
      const decoded = jwt.verify(token, config.get("jwtSecret"));

      //Assign the ID from payload to the request object
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "error" });
    }
  }
};
