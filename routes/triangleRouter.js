const express = require('express');
const bodyParser = require('body-parser');

const triangleRouter = express.Router();

triangleRouter.use(bodyParser.json());

triangleRouter.route('/')
.get((req,res,next)=>{
    res.statusCode = 403;
    res.end("Get operation not supported");
})
.post((req,res,next)=>{
    const {a,b,c} = req.body;
    var type = checkTriangleType(a,b,c);
    res.end(res.json(type))
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("Put operation not supported");
})
.delete((req,res,next)=>{
    res.statusCode = 403;
    res.end("Delete operation not supported");
});
function checkTriangleType(a,b,c){
    
    if (a<=0 || b<=0 || c<=0){
        return "Incorrect";
    }
    else if(a!=b && a!=c && c!=b){
        return "Scalene";
    }
    else if (a==b && a==c){
        return "Equilateral";
    }
    else if (a==b || a==c || b==c){
        return "Isosceles";
    }
}

module.exports=triangleRouter;