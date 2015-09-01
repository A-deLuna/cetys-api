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
module.exports = function(req, res) {

  setCookiesOnJar(res.locals.cookies);
  var getOptions = {
    url: 'http://micampus.mxl.cetys.mx/portal/auth/portal/default/Academico/Horario',
    jar: cookieJar
  };
  var i = 0;
  var j = 1;

  function Course(coursecode, name, teacher, groupcode, coursetype) {
    this.coursecode = coursecode;
    this.name = name;
    this.teacher = teacher;
    this.groupcode = groupcode;
    this.coursetype = coursetype;
    this.sessions = [];
  }

  function Session(day, houri, hourf, room) {
    this.day = day;
    this.houri = houri;
    this.hourf = hourf;
    this.room = room;
  }

  request.get(getOptions, function(err, response, body) {
    var $ = cheerio.load(body);
    var rows = $('table').eq(4).children('tr:has(td[colspan!="7"])');
    if(rows.is('tbody'))
      rows=rows.children();
    var weekday = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    var jsonResponse = {
      courses: []
    };
    for (; i < rows.length; i++) {
      var courseinfo = rows.eq(i).children().first().children().html();

      console.log('courseinfo :' + courseinfo);

      var coursecode = courseinfo.split(/ /g)[0];

      console.log('coursecode :' + coursecode);

      var re = new RegExp(coursecode+"  ","g");
      courseinfo = courseinfo.replace(re,"");

      console.log('courseinfo :' + courseinfo);

      var name = courseinfo.split(/<br>/g)[0];
      name = name.substring(0, name.length-1);
      var teacher = courseinfo.split(/<br>/g)[1];
      var groupcode = courseinfo.split(/<br>/g)[2];

      courseinfo = courseinfo.split(/<br>/g)[3];

      console.log('courseinfo :' + courseinfo);

      var coursetype = courseinfo.substring(15,courseinfo.length-4);

      var course = new Course(coursecode, name, teacher, groupcode, coursetype);

      for (j = 1; j < 7; j++) {
        var sessioninfo = rows.eq(i).children().eq(j).children().first().html();

        console.log('sessioninfo :' + sessioninfo);

        if(sessioninfo != null){
          sessioninfo = sessioninfo.substring(19,sessioninfo.length-4);

          day = weekday[j-1];

          sessioninfo = sessioninfo.split(/<br>/);

          room = sessioninfo[0];

          sessioninfo = sessioninfo[1].split(/-/);

          houri = sessioninfo[0];
          hourf = sessioninfo[1];

          var session = new Session(day, houri, hourf, room);

          course.sessions.push(session);
        }
      }
      jsonResponse.courses.push(course);
    }
    console.log(JSON.stringify(jsonResponse));
    res.send(JSON.stringify(jsonResponse));
  });
}
