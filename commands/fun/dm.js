module.exports = {
  name: "dm",
  description: "DM a user in the guild",
  category: "Fun",
  execute: async (bot, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(
        `You did not mention a user, or you gave an invalid id`
      );
    if (!args.slice(1).join(" "))
      return message.channel.send("You did not specify your message");
    user.user
      .send(args.slice(1).join(" "))
      .then(() => message.channel.send(`Sent a message to ${user.user.tag}`));
  }
};
