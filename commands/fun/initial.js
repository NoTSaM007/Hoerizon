const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "initial",
  category: "Fun",
  usage: "initial <text>",
  description: "Transforms the text you input into Initial Caps",
  execute: function(client, message, args) {
    if (args.length === 0) {
      message.channel.send("You must input text to be transformed.");
    }
    
    message.delete().catch(O_o => {});
    let embed = new MessageEmbed()
      .setColor("070707")
      .setDescription(
        args
          .map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase())
          .join(" ")
      );
    message.channel.send(embed);
  }
};
