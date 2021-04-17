//Inicialización
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const token = fs.readFileSync("token.txt").toString();
client.once("ready", () => {
	console.log("MichaBot listo!");

});




//Carga data del bot (frases, etc)
const frases = require('./JSON/frases.json');
let help = "";
fs.readFile('help.txt', 'utf8', function(err, data) {
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
const getAudio = () => { //elige un audio random
	let audios = [];
	let randIndex;
	fs.readdirSync('./sounds').forEach(File => {
		audios.push(File);
	});
	do {
		randIndex = Math.floor(Math.random() * audios.length);
	} while (randIndex == lastAudioInd)
	lastAudioInd = randIndex;
	console.log(randIndex);
	let audio = `./sounds/${audios[randIndex]}`;
	return audio;
}








//comandos del bot
client.on('message', msg => {
	if (msg.content === 'hola micha') {
		msg.channel.send('jajaja en que andan manga de gays?');
	}
});

client.on('message', msg => {
	if (msg.content === 'kufa') {
		msg.channel.send('ese es el verdadero mercenario🔪🔪');
	}
});

client.on('message', msg => {
	if (msg.content === '!frase') {
		msg.channel.send(getFrase());
	}
});



client.on('message', msg => {
	if (msg.content === '!audio') {
		const voiceChannel = msg.member.voice.channel;
		try {
			voiceChannel.join().then(connection => {
				const dispatcher = connection.play(`${getAudio()}`);
				dispatcher.on("end", end => {
					voiceChannel.leave();
				});
				client.on('message', msg => {
					if (msg.content === '!chau') {
						voiceChannel.leave();
					}

				})
			}).catch(err => console.log(err));
		}
		catch {
			msg.channel.send("TENES QUE ESTAR EN UN CHAT DE VOZ PANCHO")
		}


	}
});



client.on('message', msg =>{
	if(msg.content === '!help'){
		msg.channel.send(`${help}`);
	}
})












client.login(token);

