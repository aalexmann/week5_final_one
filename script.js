var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser')
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8080);

app.use(function(req, res, next){
    console.log('url: %s\n\t%s :: %s', req.url, req.method, req.path);
    console.log('body: ', req.body)
    next();
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.raw() )

app.get('/form', function(req, res){
    res.type('text/html');
    res.sendFile('index.html', options);
});

// var parseRequest = function(body){
//     try{ console.log(JSON.stringify(body))
//         a = JSON.parse(body);
//     return a } catch (e) {console.log(e)}  return body 
// }


var gottenObjects = function(object){
    var ulOpeningTag = '<ul>';
    for (var key in object){
        ulOpeningTag += '<li>' + key + ' ' + object[key] + '</li>';
    }
    return ulOpeningTag + '</ul>';
}

var getRequestTable = function(req){}

app.get('/', function(req, res){

    var html = '<h1>GET Request Received</h1>';
    html += '<table><tbody><tr>';
    html += '<td>url: ' + req.url + '</td>';
    html += '<td>body: ' + gottenObjects(req.body) + '</td>';
    html += '</tr></tbody></table>';
    res.send(html);
});
app.get('/error', function(req, res){
    
    res.send(html);
});
app.post('/', function(req, res){
    var html = '<h1>POST Request Received</h1>';
    html += '<table><tbody><tr>';
    html += '<td>url: ' + req.url + '</td>';
    html += '<td>body: ' + gottenObjects(req.body) + '</td>';
    html += '</tr></tbody></table>';
    res.send(html);
});

app.use(function(req, res){
    res.status(404).send('404 Error -- This page does not exist.');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('500 -- Internal Server Error')
  });
  
  app.listen('8080', function(){
    console.log('Express started on http://localhost:' + '8080' + '; press Ctrl-C to terminate.');
  });
