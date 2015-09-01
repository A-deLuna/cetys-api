var jwt = require('jwt-simple');
var Session = require('../models/session');

var loginRequest = require('../helpers/loginRequest');
console.log(loginRequest);

var auth = {

  login: function(req, res) {

    var user = req.body.user || '';
    var password = req.body.password || '';

    if (user == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials
    // are valid
    auth.validate(user, password, function(cookies){
      if(!cookies){
        res.status(401);
        res.json({
          "status": 401,
          "message":
          "Invalid credentials"
        });
        return;
      }
      if (cookies) {

        // If authentication is success, we will generate a token
        // save it in the database
        // and dispatch it to the client
        res.json(genTokenAndSaveInDB(user, cookies));
      }

    });
  },

  validate: function(user, password, callback) {
    // try to connect to cetys
    loginRequest(user, password, function(err, cookies){
      if(err){
        callback(null);
      }
      else{
        callback(cookies);
      }

    });
  },
}

// private method
function genTokenAndSaveInDB(user, cookies) {
  var expires = expiresInHours(2); // 2 hours
    var token = jwt.encode({
      user: user,
      exp: expires
    }, 'aa');

    //save to db
    var session = new Session({
      token: token,
      user: user,
      cookies: cookies,
      expires: expires
    });
    session.save(function(err, session){
      if(err){
        console.error(err);
      }
      console.log("Saved!");
      console.log(session);
    });

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresInHours(numHours) {
  var dateObj = new Date();
  return dateObj.setHours(dateObj.getHours() + numHours);
}

module.exports = auth;
