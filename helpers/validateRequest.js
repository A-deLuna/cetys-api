var jwt = require('jwt-simple');
var Session = require('../models/session');

module.exports = function(req, res, next) {
  var token = req.headers['access-token'];
  console.log('token:');
  console.log(token);
  if(token){
    try{
      var decoded = jwt.decode(token, 'aa');
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });

        return;
      }

      Session.findOne({ token: token }, function(err, session){
        if(err){
          return console.error(err);
        }
        // user is validated, call next routes
        if(session){
          console.log('user found');
          res.locals.cookies = session.cookies;
          next();
        }
      });
    } catch(err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
}
