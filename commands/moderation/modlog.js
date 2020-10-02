const db = require("quick.db");

module.exports = {
  name: "set-modlog",
  category: "Moderation",
  aliases: ["setm", "sm", "smc"],
  description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
  usage: "[channel mention | channel ID | channel name]",
  execute: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "**You Do Not Have The Required Permissions! - [MANAGE_MESSAGES]**"
      );
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          `${client.emojis.cache.get("759261156820385912")} | **Please Enter A Channel Name or ID To Set!**`
        );
    }
    let channel =
      message.mentions.channels.first() ||
      client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
      message.guild.channels.cache.find(
        c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
      );

    if (!channel || channel.type !== "text")
      return message.channel.send(`${client.emojis.cache.get("759261156820385912")} | **Please Enter A Valid Text Channel!**`);

    try {
      let a = await db.fetch(`modlog_${message.guild.id}`);

      if (channel.id === a) {
        return message.channel.send(
          `${client.emojis.cache.get("759261156820385912")} | **This Channel is Already Set As Modlog Channel!**`
        );
      } else {
        client.guilds.cache
          .get(message.guild.id)
          .channels.cache.get(channel.id)
          .send("**Modlog Channel Set!**");
        db.set(`modlog_${message.guild.id}`, channel.id);

        message.channel.send(
          `${client.emojis.cache.get("759263441587666964")} | **Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`
        );
      }
    } catch {
      return message.channel.send(
        "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**"
      );
    }
  }
};
