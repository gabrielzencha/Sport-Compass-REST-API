# Sport-Compass-REST-API
@author Gabrial Zencha <br/>
**This project is about building a RESTful API for a triangle checker and a blog post. The block post api uses a Postgres database 
while the triangle checker does not require a database connection**
**This project was built with Node.js and with help of Express. It was built using ubuntu 18.04 LTS PC**
## Prerequisite
### Node.js, PostgreSQL, Express
if you don't have Node.js installed on your pc, you can download it at https://nodejs.org/en/download/
- With Node.js installed to your pc you can now install express using npm (Node package manager) privided by Node.js installation.
at the command line type <br/>
*npm install express --save*
<br/>to install express.
- Express is one of node packages that provides you with more tools in running your backend server
- Next you will have to download and install PostgreSQL. You can obtain the latest version from https://www.postgresql.org/download/
- Next we create a database user with name "api" and password "sportcompass" (if you decided to go with different names, you must 
edit the package.json file which i will explain later.
- Create a databse with name "api", I used a sequence generator to generate ID's for my tables (you can use a serial type provided 
by PostgreSQL but i recommend using a sequnce generator). We will be using two sequenc generators to generate IDs for posts table and for comments table

<br/>CREATE SEQUENCE post_id_seq INCREMENT 1 START 1;
<br/>CREATE SEQUENCE comment_id_seq INCREMENT 1 START 1;
<br/> Now we can create our tables for our databsase
<br/>create a table posts(
<br/>post_id integer default nextval(post_id_seq) primary key,<br/>
post text );

<br/>create a table comments(
<br/>id integer default nextval(comment_id_seq) primary key,<br/>
comment varchar(100),<br/>
post_id integer,<br/>
foreign key (post_id) references posts on delete cascade );<br/>

## Setup
Clone and download this repository to a suitable location on you pc
<br/>Open the command line ant start the server by typing **npm start**
by default this will setup the hostname to local host and the server will listen at port 5000. 
<br/> You can change change the hostname and port by modifying index.js
<br/> I also assume your postgres server is listening to port 5433 (default port of postgres server) and the host is local host. If this information is different,
modify the queries.js file to match your configuration. You will not need to modify the package.json file, however if you have problems with dependencies or missing packages,
at the command line run npm install (this command will check the package.json file and install all dependences requried)

# Testing
For the Triangle api, 
I created a static html page to test this endpoint. you can access it by localhost:5000 or yourHostName:yourPortNumber . This will open 
a html page which takes  three numbers and determines what kind of triangle it is.
<br/>
For the Blog Post End Point, 
You need to have Postman installed to your pc or as an extension to your webrowser. This will help you to test methods like POST,GET,PUT, and DELETE
</br>Please read the query.js file to know how to send structure you request
to test your GET request method, you can either GET all the posts or comments in the database.<br/>
for getting all the post your request url should be  http://localhost:5000/blog/post </br>
for getting all the comments relating to particular post, your request url shoud be  http://localhost:5000/blog/comment/2
where 2 is the post id this can change according to your post of interest 
for adding a adding a post use a POST request method with request url  http://localhost:5000/blog/post you can use Postman to specify the body of the request
in json format. For this method, a post is required hence an exaple will json body string will be {"post": "This is a post"}
<br/>Like wise, for adding a comment, use  http://localhost:5000/blog/comment with method set as POST. in the json body specify the id of the post and the comment
for example {"post_id": "2", "comment": "This is a sample comment"}
<br/> For the PUT request method, we will edit a post  the request url will be  http://localhost:5000/blog/post and the id of the post to edit added to the json string example {"post_id":1, "post":"This is an edited post"} this 
will edit the post at id 1.
<br/>Similarly, we can edit a comment using the comment id wit a PUT  request method, request url  http://localhost:5000/blog/comment json body {"id":2, "comment": "This is an edited comment"}
<br/> Finnaly the last method supported by this api is the DELETE request method, the url for deleting a post will be  http://localhost:5000/blog/post and json body {"post_id":2} and for deleting a comment will be  http://localhost:5000/blog/comment with json body {"id":1}

# Additional Remarks

This is just a simple api and security constraints where not enforced, in a real production environment, the database won't be this open to all users, for example the permision to delete a post will only be to the person who created that post, hence we will need more fields in our data base.
Also the code was written assuming all inputs are entered correctly. This was done so to keep it simple because Sport Compass works with Ruby and this was developed using Node.js
In a production environment we will need to make sure all queries are right before executing, so that the server never crashes. This check was not done again because using a database was optional and I did not want to take the focus off the project.
This api can better be implemented with the help of dynamic frontend web frameworks like React.js or Angualr.js however I did not implement them because it wasn't requrired
Please feel free to comment and ask questions if you need any clarifications on the implementation procedure
