const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
var giphy = require('giphy-api')();

//CoinFlip
function coinFlip() {
    return (Math.floor(Math.random() * 2) == 0) ? ' HEADS' : ' TAILS';
}
function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}


client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "coinflip")) {
    message.channel.send(message.author + ", The coin landed on" + coinFlip() + ".");
  }
});
//

//Decider//
client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "decide")) {
    const args = message.content.slice(config.prefix).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let first = args[0]
    let second = args[2]
    desc = randomIntInc(1,2)
    if (desc===1){
      choice=first
    }
    if (desc===2){
      choice=second
    }
    message.channel.send("I have decided on " + choice + ".");
  }
});
//

//Ready Up
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
//

//Ping Pong Test
client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "ping")) {
    message.channel.send("pong");
  }
});
//

//Summon to Channel///
client.on('message', async message => {
  if (message.content.startsWith(config.prefix + "summon")) {
    const connection = await message.member.voice.channel.join();
  }
});
//

//Dimiss From Channel//
client.on('message', message => {
  if (message.content.startsWith(config.prefix + "dismiss")) {
    const voiceChannel = message.member.voiceChannel;
    voiceChannel.leave()
  }
});
//

//Error Handling//
client.on("message", (message) => {
  if (message.content.startsWith("<@354025589851815950>")) {
    message.channel.send(message.author + ", Unknown Command, please check !help.");
  }
});
//

//ROCK PAPER SCISSORS//
var res=0;
var result="";

client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "rps")) {
    res = randomIntInc(1,3);
    //scissors 1
    //paper 2
    //rock 3
    if(res===1){
      result="scissors";
    }else if(res===2){
      result="paper";
    }else if(res===3){
      result="rock";
    }
    if(message.content==="!rps rock"){
      if(res===2){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", I Win!");
      }else if(res===1){
        //lose
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", I Lost!");
      }else if(res===3){
        //draw
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", Draw");
      }/*else{
        message.channel.sendMessage("You have to /start the game")
      }*/
    }else if(message.content==="!rps paper"){
      if(res===1){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", I Win!");
      }else if(res===3){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", I Lost!");
      }else if(res===2){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", Draw");
      }
    }else if(message.content==="!rps scissors"){
      if(res===3){
        //win
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", I Win!");
      }else if(res===2){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", I Lost!");
      }else if(res===1){
        message.channel.sendMessage("I got "+ result);
        message.channel.sendMessage(message.author + ", Draw");
      }
    }}
});
//

//Help//
client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "help")) {
    message.channel.send("Available Commands:\n !ping : sends a pong response when online.\n !coinflip : flips a coin and returns heads or tails.\n !rps (rock,paper,sissors) : Plays a game!\n !decide (option,option) : Let Exbot decide on what to choose!\n !summon,!play,!dismiss : Summon Exbot to voice, play a song, then leave.\n");
  }
});
//

//Token
client.login(config.token);
//