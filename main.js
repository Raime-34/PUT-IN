const Discord = require('discord.js');
const Distube = require('distube');
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
    var command = msg.content.substr(0, 5);

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
            break;

        case '/repeat':
            distube.setRepeatMode(msg, 1);
            break;
        
        case '/repeatQ':
            distube.setRepeatMode(msg, 2);
            break;    
    }
});