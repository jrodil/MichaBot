//Inicialización
const Discord = require("discord.js");
const fs = require("fs");
const lib = require('./lib.js')
const client = new Discord.Client();


client.once("ready", () => {
	console.log("MichaBot listo!");
	client.user.setActivity('!help', { type: 'LISTENING' });
});





client.on('message', msg => {

	if (msg.content === '!help') {
		msg.channel.send(`${lib.getHelp()}`);
	}

	if (msg.content === 'hola micha') {
		msg.channel.send(lib.getFrase("micha"));
	}

	if (msg.content === 'kufa') {
		msg.channel.send(lib.getFrase("kufa"));
	}

	if (msg.content === '!frase') {
		msg.channel.send(lib.getFrase("general"));
	}

	if (msg.content.startsWith('!song')) {
		const prefix = "!song"
		const args = msg.content.slice(prefix.length).trim().split(' ')
		let song = "";
		if (args.length == 1 && args[0] == "lista") {
			
			let lista = lib.getSong("lista")
			let listaMsg = "```Elegir cancion con !song **numero**\n"
			lista.forEach((file, index) => {
				let name = file.slice(0, -4)
				listaMsg = listaMsg.concat(`\n${index}: ${name}`)
			})
			listaMsg = listaMsg.concat("```")
			msg.channel.send(listaMsg);
		}
		else if (args.length == 1 && args[0] == '') {
			
			song = lib.getSong("random")
			const voiceChannel = msg.member.voice.channel;
			if (voiceChannel) { //si usuario en canal de voz
				voiceChannel.join().then(connection => {
					const dispatcher = connection.play(`${song}`);
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
		else if (args[0].match(/^[0-9]+$/) != null) {//si es un numero
			
			song = lib.getSong(args[0])
			const voiceChannel = msg.member.voice.channel;
			if (voiceChannel) { //si usuario en canal de voz
				voiceChannel.join().then(connection => {
					const dispatcher = connection.play(`${song}`);
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
		else{
			msg.channel.send("??? que re carajos digooo")
		}
	}





	if (msg.content.startsWith("!audio")) {
		const prefix = "!audio"
		const args = msg.content.slice(prefix.length).trim().split(' ')
		let audio = "";
		if (args.length == 1 && args[0] != '') {
			if (args[0] == "lista") {//si el argumento es "lista"
				let lista = lib.getAudio("lista")
				let listaMsg = "```Elegir audio con !audio **numero**\n"
				lista.forEach((file, index) => {
					let name = file.slice(0, -4)
					listaMsg = listaMsg.concat(`\n${index}: ${name}`)
				})
				listaMsg = listaMsg.concat("```")
				msg.channel.send(listaMsg);
			}
			else if (args[0] == "jere") {
				audio = lib.getAudio("jere")
			}
			else if (args[0].match(/^[0-9]+$/) != null) {//si es un numero
				audio = lib.getAudio(args[0])
			}
			else if (args[0].match(/^[0-9]+$/) == null) { //si no es lista ni numero
				msg.channel.send("??? que re carajos digooo")
			}
		}
		else if (args.length == 1 && args[0] == '') {
			audio = lib.getAudio("random")
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

client.login(lib.getToken());