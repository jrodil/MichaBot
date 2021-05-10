const fs = require("fs");
const frases = require('./data/JSON/frases.json');


//loads data
let help = ""
fs.readFile('./data/help.txt', 'utf8', function (err, data) {
	if (err) { console.log }
	help = data;
});






const getToken = () => {
	return fs.readFileSync("./data/token.txt").toString();
}


const getHelp = () => {
	return help;
}




var lastFraseInd = {
	"kufa": null,
	"micha": null,
	"general": null,
};
const getFrase = (n) => { //N = categoria del JSON (general, kufa, micha, etc)
	let randIndex
	do {//para que no salga el mismo dos veces
		randIndex = Math.floor(Math.random() * Object.keys(frases[n]).length);
	} while (randIndex == lastFraseInd[n])
	lastFraseInd[n] == randIndex;
	return frases[n][randIndex]
}




lastSongInd = ""
let songs = [];
const getSong = (n) => {
	if(songs.length == 0){
		fs.readdirSync('./data/songs/').forEach(File => { //carga la lista de audios
			songs.push(File);
		});
	}


	if (n == "lista") {
		return songs
	}
	else if(n == "random"){
		let randIndex;
		do {
			randIndex = Math.floor(Math.random() * songs.length);
		} while (randIndex == lastSongInd)
		lastSongInd = randIndex;
		let song = `./data/songs/${songs[randIndex]}`;
		return song; 
	}
	else{
		let song = `./data/songs/${songs[n]}`;
		return song
	}
}





var lastAudioInd = {
	"general": null,
	"jere": null
}; //guarda el ultimo audio elegido
const getAudio = (n) => { //elige un audio random
	let audios = [];
	let audiosJere = [];
	if (n == "jere") {
		fs.readdirSync('./data/sounds/jere/').forEach(File => { //carga la lista de audios
			audiosJere.push(File);
		});
	}
	else {
		fs.readdirSync('./data/sounds/general/').forEach(File => { //carga la lista de audios
			audios.push(File);
		});
	}



	if (n == "lista") {
		return audios; //devuelve la lista de audios
	}
	else if (n == "random") {
		let randIndex;
		do {
			randIndex = Math.floor(Math.random() * audios.length);
		} while (randIndex == lastAudioInd["general"])
		lastAudioInd["general"] = randIndex;
		let audio = `./data/sounds/general/${audios[randIndex]}`;
		return audio; //devuelve audio random
	}
	else if (n == "jere") {
		let randIndex;
		do {
			randIndex = Math.floor(Math.random() * audiosJere.length);
		} while (randIndex == lastAudioInd["jere"])
		lastAudioInd["jere"] = randIndex;
		let audio = `./data/sounds/jere/${audiosJere[randIndex]}`;
		return audio; //devuelve audio random
	}
	else {
		lastAudioInd["general"] = n;
		let audio = `./data/sounds/general/${audios[n]}`;
		return audio; //devuelve el audio por index
	}

}



let lastImgInd = "";
const getMeme = () =>{
	let list = [];
	fs.readdirSync('./data/img/').forEach(File => { //carga la lista de audios
		list.push(File);
	});
	do{
	var i = Math.floor(Math.random() * list.length);
	}
	while(i == lastImgInd)
	lastImgInd = i

	return `./data/img/${list[i]}`

}



module.exports = { getAudio, getFrase, getHelp, getToken, getSong, getMeme }