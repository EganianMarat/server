const express = require("express");
const fs = require("fs");

const orderRoutes = express.Router();

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

orderRoutes.use("/", (req, res) => {
	let urlParams = req._parsedUrl.pathname.split('/');
	if(urlParams[1]) {
		if(datasFiles.includes(urlParams[1])) {
			console.log(urlParams[1]);
			let dataBase = dataPath + urlParams[1] + 'Data.js';
			let method = req.method;
			let stringOn = capitalizeFirstLetter(urlParams[1].slice(0, -1));
			switch(method) {
				case 'POST':
					if(urlParams[2]) {
						let dataNew = {};
						if(fs.existsSync(dataBase)) dataNew = JSON.parse(fs.readFileSync(dataBase));						
						if(!(urlParams[2] in dataNew)) {
							let maxId = 0;
							for(let r in dataNew) {
								if(maxId < ( dataNew.id * 1 ) ) maxId = dataNew.id * 1;
							}
							dataNew[urlParams[2]] = req.query;//{name : req.query['name'], time : Date.now()};
							dataNew[urlParams[2]]['id'] = maxId + 1;
							fs.writeFileSync(dataBase, JSON.stringify(dataNew));
							res.send(`${stringOn} ${urlParams[2]} is create`);
						}
						else {
							res.status(404).send(`${stringOn} ${urlParams[2]} already exists`);
						}						
					}
					else {	
						res.status(404).send(`Invalid request`);
					}
					break;
				case 'DELETE':
					if(urlParams[2] && fs.existsSync(dataBase)) {
						let dataNew = {};
						dataNew = JSON.parse(fs.readFileSync(dataBase));
						let name = '';
						if(urlParams[2] * 1 === urlParams[2]) {
							for(let r in dataNew) {
								if(dataNew.id  == (urlParams[2] * 1) ) name = dataNew.name;
							}
						}
						else {
							name = urlParams[2];
						}
						if(name != '') {
							delete(dataNew[name]);
							res.send(`${stringOn} ${capitalizeFirstLetter(name)} delete`);
						}
						else {
							res.status(404).send(`There is no ${urlParams[1].slice(0, -1)} ${capitalizeFirstLetter(name)} in our list`);
						}
					}
					else {
						res.status(404).send(`Invalid request`);
					}
					break;
				case 'PUT':
				case 'PATCH':
					if(urlParams[2] && fs.existsSync(dataBase)) {
						let dataNew = {};
						dataNew = JSON.parse(fs.readFileSync(dataBase));
						let maxId = dataNew[urlParams[2]].id;						
						if(!(urlParams[2] in dataNew)) {							
							dataNew[urlParams[2]] = req.query;//{name : req.query['name'], time : Date.now()};
							dataNew[urlParams[2]]['id'] = maxId;
							fs.writeFileSync(dataBase, JSON.stringify(dataNew));
							res.send(`${stringOn} ${urlParams[2]} updated`);
						}
						else {
							if(urlParams[2] * 1 === urlParams[2]) {
								let name = '';
								for(let r in dataNew) {
									if(dataNew.id  == (urlParams[2] * 1) ) name = dataNew.name;
								}
								if(name == '') {
									res.status(404).send(`We have no this ${stringOn}`);
								}
								else {
									res.send(`${stringOn} ${urlParams[2]} updated`);
								}
							}
							else {
								res.status(404).send(`${stringOn} ${urlParams[2]} already exists`);
							}
						}						
					}
					else {	
						res.status(404).send(`Invalid request`);
					}			
					break;
				default:			
					if(fs.existsSync(dataBase)) {		
						let dataOld = {};
						dataOld = JSON.parse(fs.readFileSync(dataBase));
						if(urlParams[2]) {
							if(urlParams[2] !== urlParams[2] * 1) {
								if(dataOld[urlParams[2]]) {
									console.log(dataOld[urlParams[2]]);
									//res.send(`Thise is data of ${urlParams[1]}`);									
									res.send(`Thise is ${JSON.stringify(dataOld[urlParams[2]])} ${urlParams[1]} data`);
								}
								else {
									console.log(dataOld[urlParams[2]]);
									res.send(`We have no this ${stringOn}`);
								}
							}
							else {
								for (let s in dataOld) {
									console.log(s.id);
								}
							}
						}
						else {
							res.send(JSON.stringify(dataOld));
							res.send(`These are all ${urlParams[1]}`);
						}
					}
					else {
						res.send(`We have no ${urlParams[1]}`);
					}
			}		
		}
		else {
			console.log('The system does not provide such tables');
			res.status(404).send(`Error`);
		}
	}
	else res.send(`Empty path`);
});

module.exports = {orderRoutes};