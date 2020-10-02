const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "shibe",
  usage: "shibe",
  description: "Finds a random shibe for your viewing pleasure.",
  category: "Image",
  execute: async (client, message, args) => {
    try {
      const res = await fetch("http://shibe.online/api/shibes");
      const img = (await res.json())[0];
      const embed = new MessageEmbed()
        .setTitle("🐶  Woof!  🐶")
        .setImage(img)
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.channel.send(embed);
    } catch (err) {
      message.client.logger.error(err.stack);
      this.sendErrorMessage(
        message,
        1,
        "Please try again in a few seconds",
        err.message
      );
    }
  }
};
