var express = require('express');
var router = express.Router();

var builds = {};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("/b/"+new Date().getTime())
});

router.get('/b/:c', function(req, res, next) {
  let build = {board:null,connectors:null,meta:null};
  let buildset = false;
  if(builds.hasOwnProperty(req.params.c)){
    build = builds[req.params.c];
    buildset = true;
  }
  res.render('build', { 
    preload:null,
    code:req.params.c,
    type:"build",
    build:build,
    buildset:buildset,
    title: 'Express',
    page:null 
  });
});

router.get('/v/:c', function(req, res, next) {
  let build = {board:null,connectors:null,meta:null};
  let buildset = false;
  if(builds.hasOwnProperty(req.params.c)){
    build = builds[req.params.c];
    buildset = true;
  }
  console.log(build);
  console.log(builds);
  console.log(req.params.c);
  res.render('build', {code:req.params.c,type:"view",build:build,buildset:buildset, title: 'Express',page:null });
});

router.get("/api/:c",function(req,res,next){
  console.log("Recieved downsync request");
  if(builds.hasOwnProperty(req.params.c))
    res.send(JSON.stringify(builds[req.params.c]))
  else
    res.status(400).send({});
})

router.post("/api/:c",function(req,res,next){
  console.log("Recieved upsync request");
  builds[req.params.c] = JSON.parse(req.body.build);
  res.status(200).send(JSON.stringify(builds[req.params.c]));
})

module.exports = router;
