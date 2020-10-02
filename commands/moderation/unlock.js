module.exports = {
  name: "unlock",
  category: "Moderation",
  aliases: [],
  usage: "unlock",
  execute: (client, message, args) => {
    if (!client.lockit) client.lockit = [];
    if (!message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You Don't have permission");

    message.channel
      .createOverwrite(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.channel.send("Lockdown Lifted!");
        delete client.lockit[message.channel.id];
      })
      .catch(error => {
        console.log(error);
      });
  }
};