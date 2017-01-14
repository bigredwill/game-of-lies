var shortid = require('shortid')
var express = require('express')
var app = express()

var game_template = {
	cards: ['Oberon','Assassin','Mordred','Morgana',
							'Merlin','Percival','Good Guy','Good Guy','Good Guy','Good Guy'],
	id: null
}

var games = {};

var crossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	next();
}

app.use(crossDomain);

app.post('/game/new', function(req, res) {
	var id = shortid.generate();
	console.log()
	games[id] = Object.assign({}, {cards: game_template.cards.slice()}, {id: id})
	console.log('New Game: ', games[id]);
	res.json(games[id]);
})

app.get('/games/:id', function(req, res) {

	var id = req.params.id;

	var game = games[id];

	if (!game) {
		res.status(500).json({ error: 'No game with id.' });
		return
	}

	var card = game.cards.splice(Math.floor(Math.random()*game.cards.length),1)[0];

	if (!card) {
		console.log('Max Capacity');
		res.status(500).json({ error: 'No more room in game.' });
	} else {
		console.log('You are: ', card);
		res.json({card: card});
	}

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
