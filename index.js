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

	if (msg.content === 'dante') {
		msg.channel.send(lib.getFrase("dante"));
	}

	if (msg.content === 'lean' || msg.content === 'leandro') {
		msg.channel.send(lib.getFrase("leandro"));
	}

	if (msg.content === '!frase') {
		msg.channel.send(lib.getFrase("general"));
	}




	if (msg.content.startsWith('!song')) {
		const prefix = "!song"
		const args = msg.content.slice(prefix.length).trim().split(' ')
		let cmd, data;


		if (args.length == 1 && args[0] == "lista") {
			cmd = "lista";
			data = lib.getSong("lista");
		}
		else if (args.length == 1 && args[0] == '') {
			cmd = "random";
			data = lib.getSong("random");
		}
		else if (args[0].match(/^[0-9]+$/) != null) {
			cmd = "numero";
			data = lib.getSong(args[0]);
		}
		else {
			cmd = "error";
			data = "??? QUE RE CARAJOS DIGOOO"
		}








		if (cmd == "error") {
			msg.channel.send(data)
		}
		else if (cmd == "lista") {
			let listaMsg = "```Elegir cancion con !song **numero**\n"
			data.forEach((file, index) => {
				let name = file.slice(0, -4)
				listaMsg = listaMsg.concat(`\n${index}: ${name}`)
			})
			listaMsg = listaMsg.concat("```")
			msg.channel.send(listaMsg);
		}
		else if (cmd == "random" || cmd == "numero") {
			const voiceChannel = msg.member.voice.channel;
			if (voiceChannel) { //si usuario en canal de voz
				voiceChannel.join().then(connection => {
					const dispatcher = connection.play(`${data}`);
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
	if (msg.content.startsWith("!audio")) {
		const prefix = "!audio"
		const args = msg.content.slice(prefix.length).trim().split(' ')
		let cmd, data;

		if (args.length == 1 && args[0] == "lista") {
			cmd = "lista"
			data = lib.getAudio("lista")
		}
		else if (args.length == 1 && args[0] == '') {
			cmd = "random"
			data = lib.getAudio("random")
		}
		else if (args.length == 1 && args[0] == "jere") {
			cmd = "jere"
			data = lib.getAudio("jere")
		}
		else if (args.length == 1 && args[0].match(/^[0-9]+$/) != null) {
			cmd = "numero"
			data = lib.getAudio(args[0])
		}
		else {
			cmd = "error"
			data = "??? QUE RE CARAJOS DIGOOO"
		}




		if (cmd == "error") {
			msg.channel.send(data)
		}
		else if (cmd == "lista") {
			let listaMsg = "```Elegir audio con !audio **numero**\n"
			data.forEach((file, index) => {
				let name = file.slice(0, -4)
				listaMsg = listaMsg.concat(`\n${index}: ${name}`)
			})
			listaMsg = listaMsg.concat("```")
			msg.channel.send(listaMsg);
		}
		else if (cmd == "random" || cmd == "jere" || cmd == "numero") {
			const voiceChannel = msg.member.voice.channel;
			if (voiceChannel) { //si usuario en canal de voz
				voiceChannel.join().then(connection => {
					const dispatcher = connection.play(`${data}`);
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