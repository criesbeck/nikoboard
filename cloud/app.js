
// initialize Express in Cloud Code.
express = require('express');
parseExpressHttpsRedirect = require('parse-express-https-redirect');

// load SHA1 module for LTI verification
jsSHA = require('cloud/sha1.js');

app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
app.use(parseExpressHttpsRedirect());

var Team = Parse.Object.extend('Team');

// LTI open mood entry form
// Eventually need to validate oauth signature 
app.post('/launch', function(req, res) {
  handleNikoRequest('entry', req, res);
});

// LTI test student access
app.post('/test', function(req, res) {
  handleNikoRequest('test', req, res);
});

function handleNikoRequest(view, req, res) {
  var netid = req.body.lis_person_sourcedid || req.body.custom_canvas_user_id;
  var course = req.body.context_label;
  if (!course) {
    res.send(400, "No course label received");
  }
  else if (!netid) {    
    res.send(400, "No netID received");
  }
  else {
    var query = new Parse.Query(Team);
    query.equalTo("Netid", netid);
    query.equalTo("Course", course);
    query.first().then(function(entry) {
      res.render(view, { 
        netid: netid, 
        course: course,
        team: entry ? entry.get("Team").toLowerCase() : "undefined"
      });
    },
    function() {
      res.send(500, 'Failed to find you in the database');
    });
  }
}

// for debugging ... still haven't managed to validate oauth_signature
app.post('/json', function(req, res) {
  res.render('json-dump', { method: req.method,
    protocol: req.protocol, 
    host: req.headers.host,
    json: JSON.stringify(req.body, null, 2)
  });
});

// Attach the Express app to Cloud Code.
app.listen();

// Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });
