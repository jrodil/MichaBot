const fs = require("fs");
const frases = require('./data/JSON/frases.json');


//loads data
let help = ""
fs.readFile('./data/help.txt', 'utf8', function (err, data) {
    if (err){console.log} 
    help =  data;
});



const getToken = () =>{
    return fs.readFileSync("./data/token.txt").toString();
}



const getHelp = () =>{
    return help;
}




var lastFraseInd = null; //guarda la ultima frase elegida
const getFrase = () => {//Elige frase random del JSON
	let randIndex;
	do {//para que no salga el mismo dos veces
		randIndex = Math.floor(Math.random() * Object.keys(frases["general"]).length);
	} while (randIndex == lastFraseInd)
	lastFraseInd = randIndex;
	let frase = frases["general"][randIndex];
	return frase;
}





var lastAudioInd = null; //guarda el ultimo audio elegido
const getAudio = (n) => { //elige un audio random
	let audios = [];
	fs.readdirSync('./data/sounds').forEach(File => { //carga la lista de audios
		audios.push(File);
	});
	if (n == "lista") {
		return audios; //devuelve la lista de audios
	}
	else if (n == "random") {
		let randIndex;
		do {
			randIndex = Math.floor(Math.random() * audios.length);
		} while (randIndex == lastAudioInd)
		lastAudioInd = randIndex;
		console.log(randIndex);
		let audio = `./data/sounds/${audios[randIndex]}`;
		return audio; //devuelve audio random
	}
	else {
		let audio = `./data/sounds/${audios[n]}`;
		return audio; //devuelve el audio por index
	}

}


module.exports = {getAudio, getFrase, getHelp, getToken}