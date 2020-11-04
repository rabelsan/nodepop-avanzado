/* eslint-disable no-undef */
'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {

/* POST /api/authenticate */
/**
 * @api {POST} /api/authenticate Create a new JWT POST body parameters email and password
 * @apiGroup Authentication
 * @apiParam {String} email
 * @apiParam {String} password
 * @apiSuccessExample {json({ tokenJWT: tokenJWT })} Success  
 *    HTTP/1.1 200 OK
 *    
  {
    "tokenJWT": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
                eyJfaWQiOiI1ZjlkYTk4MzNlMzAyMTMzNTZkOTdlMjEiLCJpYXQiOjE2MDQ1MTU3NjIsImV4cCI6MTYwNDUxNTc2N30.
                YPoZWhnZxm1R3SK5Ei_xFB9_eXA073nYL-cBZfO4lrE"
  }
 * @apiErrorExample {error} List error
 *    HTTP/1.1 401 Unauthorized
  {
    "error": "invalid credentials"
 }
 */
  async postJWT(req, res, next) {
    try {

      // collect the body values
      const email = req.body.email;
      const password = req.body.password;
      
      // retrieve the user from the BD
      const user = await User.findOne({ email: email });

      // if does not exits the user or the password is wrong ->
      // return error
      if (!user || !(await bcrypt.compare(password, user.password )) ) {
        // responder un error de autenticación en JSON
        const error = new Error('invalid credentials');
        error.status = 401;
        next(error);
        return;
      }

      // if does exits the user or the password is right ->
      // create a new JWT 
      jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d'}, (err, tokenJWT) => {
        if (err) return next(err);
        // replay
        res.json({ tokenJWT: tokenJWT });
      });


    } catch(err) {
      return next(err);
    }

  }
}

module.exports = new LoginController();
