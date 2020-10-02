const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "Image",
  description: "Shows Avatar",
  usage: "[username | nickname | mention | ID](optional)",
  execute: async (bot, message, args) => {
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(u => u.user.username === args.join(" ")) || message.member;
    
    let embed = new MessageEmbed()
    .setDescription(user.user.tag + "'s Avatar")
    .setTimestamp()
    .setImage(user.user.avatarURL({ format: "png", size: 2048, dynamic: true }))
    .setColor("RANDOM")
    message.channel.send(embed);
    
  }
};
