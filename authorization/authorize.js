import Allusers from "../models/allusersmodels.js";
import jwt from 'jsonwebtoken';

export const authorizeRoles = (roles) =>
  async (req, res, next) => {

    const token =
      (req.header("Authorization") &&
        req.header("Authorization").split("Bearer ")[1]) ||
      null;

    
      
    if (!token) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided" });
    }

    try {
      const decoded = jwt.verify(token,"thesecret");
      const user = await Allusers.findOne({ _id: decoded.id });

      if (!user) {
        return res.status(400).send({ message: "Invalid user" });
      }

      const authorizedRole = roles.find((role) => user.role === role );

      if (!authorizedRole) {
        return res
          .status(403)
          .send({ message: "Access denied. Not an authorized role" });
      }

      req.body.user = user._id;
      next();
    } catch (error) {
      return res.status(400).send({ message: "Invalid token" });
    }
  };
