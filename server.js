const fs = require("fs");
const express = require("express");
const app = express();
const fPath = './data.js'

app.use(express.json());

app.get('/user', (req, res) => {
	let dataOld = {};
	if(fs.existsSync(fPath)) dataOld = JSON.parse(fs.readFileSync(fPath));
	res.send(JSON.stringify(dataOld));
	res.send(`Thise is a users list`);
})
app.post('/user', (req, res) => {
	let dataNew = {};
	if(fs.existsSync(fPath)) dataNew = JSON.parse(fs.readFileSync(fPath));
	if(!(req.query['nic'] in dataNew)) {
		dataNew[req.query['nic']] = {name : req.query['name'], time : Date.now()};
		fs.writeFileSync(fPath, JSON.stringify(dataNew));
		res.send(`User ${req.query['name']} has allredy created`);
	}
	else res.send(`The nic ${req.query['name']} allredy bizy`);
})

app.put('/user', (req, res) => {
	let dataNew = {};
	if(fs.existsSync(fPath)) dataNew = JSON.parse(fs.readFileSync(fPath)); 
	dataNew[req.query['nic']] = {name : req.query['name'], time : Date.now()};
	fs.writeFileSync(fPath, JSON.stringify(dataNew));
	res.send(`Data of user ${req.query['name']} has allredy changed`);
})

app.delete('/user', (req, res) => {
	let dataNew = {};
	if(fs.existsSync(fPath)) dataNew = JSON.parse(fs.readFileSync(fPath)); 
	delete(dataNew[req.query['nic']]);
	fs.writeFileSync(fPath, JSON.stringify(dataNew));
	res.send(`User ${req.query['name']} has allredy deleted`);
})
app.listen(8000)