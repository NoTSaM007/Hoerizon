module.exports = {
  name: "slowmode",
  aliases: ["sm"],
  category: "Utility",
  description: "Set the slowmode for the channel!",
  execute: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    let reason = message.content.slice(
      client.prefix.length + 9 + args[0].length + 1
    );
    if (!reason) {
      reason == "No reason provided!";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(
      `**Set The Slowmode Of This Channel To ${args[0]}s** **\`${reason ||
        "No Reason"}\`**`
    );
  }
};
