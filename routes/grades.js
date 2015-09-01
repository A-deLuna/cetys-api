var request = require('request');
var cheerio = require('cheerio');
var cookieJar = request.jar();

function setCookiesOnJar(cookiesString) {
  var url = "http://micampus.mxl.cetys.mx";

  var cookies = cookiesString.split(" ");

  cookies.forEach(function(cookie){
    cookieJar.setCookie(cookie, url);
  });
}

module.exports = function(req, res){

  setCookiesOnJar(res.locals.cookies);

  var getOptions= {
    url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Consultar+boleta', 
    jar: cookieJar
  };
  var i = 3; // first row of table to start 
  var j = 8; // first column with grades

  function Course(name) {
    this.name = name;
    this.grades = [];
  }
 
  request.get(getOptions, function(err, response, body){
    var $ = cheerio.load(body);

    var rows = $('table.alumnos-tabla').children();
    var jsonResponse = {courses: []};

    for(; i < rows.length; i++){
      var name = rows.eq(i).children().first().text();
      var course = new Course(name);

      for(j = 8; j < 13; j++){
        var grade = rows.eq(i).children().eq(j).text();
        course.grades.push(grade);
      }
      jsonResponse.courses.push(course);
    }
    console.log(JSON.stringify(jsonResponse));
    res.send(JSON.stringify(jsonResponse));

  });
}
