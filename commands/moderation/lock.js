module.exports = {
  name: "lockdown",
  category: "Moderation",
  aliases: ["lock"],
  usage: "lockdown",
  execute: (client, message, args) => {
    if (!client.lockit) client.lockit = [];
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You dont have permission");

    message.channel.createOverwrite(message.guild.id, {
      SEND_MESSAGES: false
    });
    message.channel.send("Channel Has ben locked down");
  }
};
