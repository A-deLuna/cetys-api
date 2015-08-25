var request = require('request');
var cheerio = require('cheerio');
module.exports = function(req, res){
  var cookieJar = request.jar();
  var options = { url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/default?loginheight=0', jar: cookieJar};
  var postForm  = {j_username: req.body.user, j_password: req.body.password};
  console.log(postForm);
  var postOptions = {
    url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/j_security_check',
    form: postForm , 
    jar: cookieJar,
    headers: {
      'Referer': 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/default?loginheight=0',
    },
    followAllRedirects: true
  };
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

  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      request.post(postOptions, function(err, response, body){

        request.get(getOptions, function(err, response, body){

          var $ = cheerio.load(body);
          console.log(body);
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
      });
    }
  });
  
}
