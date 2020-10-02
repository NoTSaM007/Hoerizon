const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  aliases: ["pong", "beep", "boop"],
  description: "Gets Horizon's current latency and API latency.",
  category: "Info",
  execute: async (client, message) => {
    const embed = new MessageEmbed()
      .setDescription("`Pinging...`")
      .setColor("00FFFF");
    const msg = await message.channel.send(embed);
    const timestamp = message.editedTimestamp
      ? message.editedTimestamp
      : message.createdTimestamp; // Check if edited
    const latency = `\`[ ${Math.floor(msg.createdTimestamp - timestamp)}ms ]\``;
    const apiLatency = `\`[ ${Math.round(message.client.ws.ping)}ms ]\``;
    embed
      .setTitle(`ᴘᴏɴɢ !`)
      .setDescription("")
      .addField(`Lᴀᴛᴇɴᴄʏ :heartbeat:`, latency, true)
      .addField(`API Lᴀᴛᴇɴᴄʏ :hourglass:`, apiLatency, true)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    msg.edit(embed);
  }
};
