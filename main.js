const Discord = require('discord.js');
const Distube = require('distube');
const {resolveSpeechWithGoogleSpeechV2} = require('discord-speech-recognition');
const client = new Discord.Client();
const {token} = require('./config.json');
const distube = new Distube(client, {searchSongs: true, emitNewSongOnly: true});
const {prefix} = require('./config.json');
const {music_channel} = require('./config.json');
const {reserved} = require('./config.json');
const { DisTubeOptions } = require('distube');
const validator = require('youtube-validator');
const { validateUrl } = require('youtube-validator');
client.login(token);

client.on('ready', () =>{
    console.log('Опять работать');
});

distube.on("searchResult", (message, results) => {
    message.channel.send(`**Choose an option from below**\n${results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
});

client.on('message', msg=>{
    if(msg.author.bot) return;
    
    reserved.forEach(element => {
        if(element.name === msg.content.toLowerCase().trim()){
            distube.play(msg, element.url);
            return;
        }
    });

    // validator.validateUrl(msg.content, function(res, err) {
    //     if(err) //err
    //     {
    //         msg.channel.send(msg.content);
    //         msg.channel.send(err);
    //     }
    //     else
    //       {
    //         msg.channel.send("video url is correct");
    //      }
    //   });

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

    try {
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
                
            case '/cyka':
                msg.channel.send('Ебанный рот этого казино, блять', {tts: true});
                break;
    
            case '/join':
                msg.member.voice.channel.join();
                break;
    
            case '/showQ':
                let Q = distube.getQueue(msg);
                let line = '```' + Q.songs.map((song, id) => (id + 1) + '. ' + song.name).join('\n') + '```';
                msg.channel.send('Текущая очередь:\n' + line);
                break;

            case '/Q':
                let q = distube.search(msg.content.replace(command, '').trim());
                q.then((value) => {msg.channel.send(value.url + '\n')});
                break;

            case '/BB':
                let filter = distube.setFilter(msg, msg.content.replace(command, '').trim());
                msg.channel.send("Current queue filter: " + (filter || "Off"));
                break;
        }
    } catch (MinigetError) {
        msg.channel.send(MinigetError.message);
    }

    client.on("speech", (msg) => {
        msg.author.send(msg.content);
      });
});