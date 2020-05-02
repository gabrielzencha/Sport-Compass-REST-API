/**
 * @author Gabrial Zencha
 * This file handles incoming server request by connecting to the database and perfoming the required operation
 */
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'api',
  host: 'localhost',
  database: 'api',
  password: 'sportcompass',
  port: 5433,
});

/*
This GET Request method. It connects to the database specified by the configuration above, retrives all the blog posts
and respond with a json string of all the blog posts
If an error occurs, it logs it to the console else it sets the status code to 200
*/
const getblogposts = (request, response) =>{
    pool.query('SELECT * FROM posts ORDER BY post_id ASC',(error, result) =>{ 
        if(error){
            console.log(error);
        }
        response.status(200).json(result.rows);
    });

}
/*
This a POST Request method. It connects to the database specified by the configuration above, retrives all the comments to a particular post
that is, the client endpoint must specify the id of the post whose comments which to be retrived
If an error occurs, it logs it to the console else it sets the status code to 200
*/
const getComments = (request, response) =>{
    const post_id = parseInt(request.params.id); 
    
    pool.query('SELECT * FROM comments WHERE post_id=$1 ORDER BY id ASC',[post_id],(error, result) =>{
        if(error){
            console.log(error);
        }
        response.status(200).json(result.rows);
    });

}
/* This is POST request method, it adds a post to the database. The id of the blog post is determined by the database
First we check if the post is not null before adding to our database. If an error occures,  it logs it the console else it 
sets the status code to 201 and respond with a success message 
*/
const createPost = (request, response) => {
    const post = request.body.post;
    if(post!=null){
        pool.query('INSERT INTO posts (post) VALUES($1)',[post], (error, results)=>{
            if (error){
                console.log(error);
            }
            response.status(201).send("Post added");
        });
    }
    else{
        console.log("Cannot insert empty post");
    }
   
}
/* Similar to creating a blog post above, this POST method also adds a comment to our database. Then client endpoint must give 
the id of the post whose comment wish to be created. */
const createComment = (request, response) => {
    const post_id = request.body.post_id;
    const comment = request.body.comment;
    if(comment!=null){
        pool.query('INSERT INTO comments(post_id, comment) VALUES ($1, $2)',[post_id, comment], (error, results)=>{
            if (error){
                console.log(error);
            }
            response.status(201)
        });
    }
    else{
        console.log("Cannot insert empty comment");
    }
    
}
/*
This is a PUT It updates the post specified by the given post ID
Of course in a production environment I will first check if the post exist before executing the update statemet
To keep this code simple I assume the post exist
*/
const updatePost = (request, response)=>{
    const id = parseInt(request.body.id);
    const post = request.body.post;
    
    pool.query(
        'UPDATE posts  SET post = $1 WHERE post_id=$2',[post, id], 
    (error, results)=>{
        if(error){
            console.log(error)
        }
            response.status(200).send('post updated');
       
    }
    );
}
/*
This is a PUT It updates the comment specified by the given comment ID
Of course in a production environment I will first check if the comment exist before executing the update statemet
To keep this code simple I assume the comment exist
*/
const updateComment = (request, response)=>{
    const id = parseInt(request.body.id);
    const comment  = request.body.comment;
    pool.query(
        'UPDATE comments SET comment = $1 WHERE id=$2',[comment, id], 
    (error, results)=>{
        if(error){
            console.log(error);
        }
        response.status(200).send('comment updated');
    }
    );
}
/* This  is a DELETE Method which deletes a post specified by the post ID */
const deletePost = (request, response) => {
    const id = parseInt(request.body.id);
    pool.query('DELETE FROM posts WHERE post_id =$1', [id], (error, result)=>{
        if(error){
           console.log(error);
        }
        response.status(200).send('Post deleted');
    })
}
/* This  is a DELETE Method which deletes a comment specified by the post ID */
const deleteComment = (request, response) => {
    const id = parseInt(request.body.id);
    pool.query('DELETE FROM comments WHERE id =$1', [id], (error, result)=>{
        if(error){
            console.log(error);
        }
        response.status(200).send('comment deleted');
    })
}

/** Finally I export all the modules so that it can be used any where on my express server */
module.exports = {
    getblogposts,
    getComments,
    createPost,
    createComment,
    updateComment,
    updatePost,
    deletePost,
    deleteComment
};

