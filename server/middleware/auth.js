import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //verify user -> check token

    const token = req.headers.authorization.split(" ")[1]; // grab 1st position
    const isCustomAuth = token.length < 500; // our token or Google's

    let decodedData;

    //ours
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "Jesus"); // secret
      req.userId = decodedData?.id;
    }
    //Google's
    else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub; //sub -> Google user's unique id
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
