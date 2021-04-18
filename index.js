//Inicialización
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const token = fs.readFileSync("./data/token.txt").toString();
client.once("ready", () => {
	console.log("MichaBot listo!");
	client.user.setActivity('!help', { type: 'PLAYING' });

});

//Carga data del bot (frases, etc)
const frases = require('./data/JSON/frases.json');
let help = "";
fs.readFile('./data/help.txt', 'utf8', function (err, data) {
	if (err) throw err;
	help = data;
});







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





client.on('message', msg => {
	if (msg.content === '!help') {
		msg.channel.send(`${help}`);
	}

	if (msg.content === 'hola micha') {
		msg.channel.send('jajaja en que andan manga de gays?');
	}

	if (msg.content === 'kufa') {
		msg.channel.send('ese es el verdadero mercenario🔪🔪');
	}

	if (msg.content === '!frase') {
		msg.channel.send(getFrase());
	}


	if (msg.content.startsWith("!audio")) {
		const prefix = "!audio"
		const args = msg.content.slice(prefix.length).trim().split(' ')
		let audio = "";
		if (args.length == 1 && args[0] != '') {
			if (args[0] == "lista") {//si el argumento es "lista"
				let lista = getAudio("lista")
				let listaMsg = "```Elegir audio con !audio **numero**"
				lista.forEach((file, index) => {
					listaMsg = listaMsg.concat(`\n${index}: ${file}`)
				})
				listaMsg = listaMsg.concat("```")
				msg.channel.send(listaMsg);
			}
			else if (args[0].match(/^[0-9]+$/) != null) {//si es un numero
				audio = getAudio(args[0])
			}
			else if (args[0].match(/^[0-9]+$/) == null) { //si no es lista ni numero
				msg.channel.send("??? que re carajos digooo")
			}
		}
		else if (args.length == 1 && args[0] == '') {
			audio = getAudio("random")
		}
		else { //si tiene mas de un argumento
			msg.channel.send("??? que re carajos digooo")
		}




		if (audio != "") {
			const voiceChannel = msg.member.voice.channel;
			if (voiceChannel) { //si usuario en canal de voz
				voiceChannel.join().then(connection => {
					const dispatcher = connection.play(`${audio}`);
					client.on('message', msg => {
						if (msg.content === '!chau') {
							voiceChannel.leave();
						}
					})
				}).catch(err => console.log(err));
			}
			else {
				msg.channel.send("TENES QUE ESTAR EN UN CHAT DE VOZ PANCHO")
			}


		}
	}
})

client.login(token);














