const express = require(`express`)
const nunjucks = require(`nunjucks`)
const server = express()
const routes = require(`./routes`)
const methodOverride = require(`method-override`)


server.use(express.urlencoded({ extended: true}))


server.use(express.static(`public`))
server.use(methodOverride(`_method`))
server.use(routes)

server.set(`view engine`,`njk`)	

nunjucks.configure(`views`, {
express: server,
noCache: true
}) 

server.listen(5646, function(){
	console.log(`server is running`)
})


server.use(function(req, res) {
	res.status(404).send("not_found");
  });
