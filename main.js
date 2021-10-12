const Discord = require('discord.js');
const Distube = require('distube');
const {resolveSpeechWithGoogleSpeechV2} = require('discord-speech-recognition');
const client = new Discord.Client();
const {token} = require('./config.json');
const distube = new Distube(client, {searchSongs: false, emitNewSongOnly: true});
const {prefix} = require('./config.json');
const {music_channel} = require('./config.json');
client.login(token);

client.on('ready', () =>{
    console.log('Опять работать');
});

client.on('message', msg=>{
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;
    if(!msg.channel.name === music_channel) return;
    // if(!msg.author.voice){
    //     msg.channel.send('Войдите в голосовой чат');
    // }
    var devider = msg.content.indexOf(' ');
    var command;
    if(devider === -1)
        command = msg.content;  
    else command = msg.content.substr(0, devider);

    switch(command){
        case '/play':
            distube.play(msg, msg.content.replace(command, '').trim());
            break;

        case '/stop':
            distube.stop(msg);
            break;

        case '/pause':
            distube.pause(msg);
            break;

        case '/skip':
            distube.skip(msg);
            break;

        case '/!repeat':
            distube.setRepeatMode(msg, 0);
            msg.channel.send('Должен был выключить Repeat Mod');
            break;

        case '/repeat':
            distube.setRepeatMode(msg, 1);
            msg.channel.send('Должен был включить Repeat Mod для конкретной песни');
            break;
        
        case '/repeatQ':
            distube.setRepeatMode(msg, 2);
            msg.channel.send('Должен был включить Repeat Mod для всего плейлиста');
            break; 
            
        case '/cyka':
            msg.channel.send('Я должен был говорить сука без остановки', {tts: true});
            var i = 0;
            while(i < 5){
                msg.channel.send('СУКА', {tts: true});
                i++;
            }
            break;

        case '/join':
            msg.member.voice.channel.join();
            break;
    }

    client.on("speech", (msg) => {
        msg.author.send(msg.content);
      });
});