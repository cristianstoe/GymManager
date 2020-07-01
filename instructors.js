exports.post = function(req, res){
	const keys = Object.keys(req.body)
	for(key of keys){
		if(req.body[key] == ``){
			return res.send(`sadjasd`)
		}
	}

	return res.send(req.body)
}