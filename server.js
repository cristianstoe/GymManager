const express = require(`express`)
const nunjucks = require(`nunjucks`)
const server = express()

server.use(express.static(`public`))

server.set(`view engine`,`njk`)

nunjucks.configure(`views`, {
express: server,
noCache: true
}) 

server.get(`/`, function(req, res){
	
})


server.listen(1478, function(){
	console.log(`server is running`)
})

server.use(function(req, res) {
	res.status(404).send("not_found");
  });
