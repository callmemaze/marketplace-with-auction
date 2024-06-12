import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) return res.status(403).json("You don't have authority");

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "secret");

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
