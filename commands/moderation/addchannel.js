module.exports = {
  name: "addchannel",
  category: "Moderation",
  aliases: ["addch","chadd"],
  description: "Creates a channel in the server.",
  usage: "createchannel <voice/text> <name>",
  execute: async (client, message, args) => {
    try {
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          "You Dont Have Permissions To Use This - **[ADMINISTRATOR]**"
        );
      if (!args[0])
        return message.reply(
          `${client.emojis.cache.get(
            "759261156820385912"
          )} | You need to give me the channel type!`
        );
      if (!args.slice(1).join(" "))
        return message.reply(
          `${client.emojis.cache.get(
            "759261156820385912"
          )} | You need to give me the channel name!`
        );

      let types = ["text", "voice"];
      if (!types.includes(args[0])) {
        return message.reply(`${client.emojis.cache.get("759261156820385912")} | You need to give me valid channel type! Available types: \`text\`, \`voice\`!`
        );
      }

      message.channel.send(`${client.emojis.cache.get("759263441587666964")} | I've created the channel!`).then(() => {
        message.guild.channels
          .create(args.slice(1).join(" "), {
            type: args[0] === "text" ? "text" : "voice"
          })
          .catch(err => {
            message.channel.send("There was an error!");
          });
      });
    } catch (err) {
      message.channel.send("There was an error!\n" + err).catch();
    }
  }
};
