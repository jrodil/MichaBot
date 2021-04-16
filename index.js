const frases = require('./JSON/frases.json');




//Inicialización
const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const token = fs.readFileSync("token.txt").toString();
client.once("ready", () => {
	console.log("MichaBot listo!");

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






//comandos del bot
client.on('message', msg => {
	if (msg.content === 'hola micha'){
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











client.login(token);

