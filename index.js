/**@author Gabrial Zencha 
 * Express same like Node.js will help us create a backend server, however express helps with the posibility of 
 * adding several routes and easy setup of our backend server
 */
const express = require('express')
/**body-parser will help format our incoming requests */
const bodyParser = require('body-parser')
/*Already setup in the queries.js file. This will accept incoming request to our server related to database operations 
and respond to them */
const db = require('./queries')
const http = require('http');
/*The host name or host url for our server */
const hostname ='localhost';
/**Set the port which we want our backend server to run on */
const port = 5000; 

/** This Creates a mini express router to handle endpoints for the triangle api if we have multiple endpoints
 * it is advisable to use different routes and only merge them here on the main server
 */
var triangleRouter = require('./routes/triangleRouter');

/*Create a express server */
var app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
/* Serve Static  */
app.use(express.static(__dirname+'/public'));
/*Specify the different functions to handle each request comming via a particular route */
app.use('/triangle', triangleRouter);
app.get('/blog/post',db.getblogposts);
app.post('/blog/post',db.createPost);
app.put('/blog/post',db.updatePost);
app.delete('/blog/post',db.deletePost);
app.get('/blog/comment/:id',db.getComments);
app.post('/blog/comment',db.createComment);
app.put('/blog/comment',db.updateComment);
app.delete('/blog/comment',db.deleteComment);

/*Create a http server */
const server = http.createServer(app);
/*Listen to incoming server requests */
server.listen(port, hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});