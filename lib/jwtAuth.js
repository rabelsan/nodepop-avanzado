/* eslint-disable no-undef */
'use strict';

const jwt = require('jsonwebtoken');

//this function returns an authentication middleware with JWT
//if the token is not correct it returns an error 
module.exports = function() {
  return (req, res, next) => {
    // check if we have an Authorization header with a valid JWT 

    // keep the token
    const tokenJWT = req.get('Authorization') || req.query.token || req.body.token;

    // return error if not token
    if (!tokenJWT) {
      const error = new Error('no token provided');
      error.status = 401;
      next(error);
      return;
    }

    // verify the token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      if (err) { 
        if (err.name === 'TokenExpiredError') {
          err.status = 401;
        }
        return next(err);
      }
      req.apiAuthUserId = payload._id;
      next();
    });

  };
};
