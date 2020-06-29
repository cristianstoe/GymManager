const express = require(`express`)
const nunjucks = require(`nunjucks`)
const server = express()
const routes = require(`./routes`)

server.use(express.static(`public`))
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
