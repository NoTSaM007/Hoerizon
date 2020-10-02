const canva = require("canvacord");
const Discord = require("discord.js");
const { changemymind } = require("canvacord");

module.exports = {
  name: "changemymind",
  category: "Image",
  description: "Change My Mind",
  execute: async (client, message, args) => {
    let text = args.slice(0).join(" ");

    if (!args[0])
      return message.channel.send("Provide The Text");

    let image = await canva.changemymind(text);

    let changeMyMind = new Discord.MessageAttachment(image, "cmm.png");

    message.channel.send(changeMyMind);
  }
};
