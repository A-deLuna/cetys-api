var cheerio = require('cheerio');
var request = require('request');
var cookieJar = request.jar();
var ok = false;


var login = function(user, password, callback) {
  fetchCookies(user, password, callback);
}

var fetchCookies = function(user, password, callback) {
  fetchFirstCookie(user, password, callback);
}

var fetchFirstCookie = function(user, password, callback) {
  var options = { 
    url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/default?loginheight=0',
    jar: cookieJar
  };
  request(options, function (error, response, body) {
    if(error || response.statusCode !== 200) {
      callback(error,"");
    }
    fetchSecondCookie(user, password, callback);
  });
}

var fetchSecondCookie = function(user, password, callback) {
  var form = {
    j_username: user,
    j_password: password
  };

  var options = {
    url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/j_security_check',
    form: form , 
    jar: cookieJar,
    headers: {
      'Referer': 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/default?loginheight=0',
    },
    followAllRedirects: true
  };

  request.post(options, function(error, response, body){
    if(error || response.statusCode !== 200) {
      callback(error,"");
    }
    var cookies = cookieJar.getCookieString('http://micampus.mxl.cetys.mx');
    console.log(cookies);
    validateOk(cookies,callback);

  });
}
// we need to check we have both cookies, meaning that the log in was valid
function validateOk(cookies, callback){
  var cookie_array = cookies.split(" ");
  if(cookie_array.length !== 2) { 
    return callback(new Error("Invalid credentials"), "");
  }
  callback(null, cookies);
}

module.exports = login;
