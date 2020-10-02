const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "space",
  category: "Fun",
  usage: "space [amount] <text>",
  description: "Spaces out text to look all dramatic n' stuff",
  execute: function(client, message, args) {
    if (args.length < 1) {
      message.channel.send("You must provide text to space out!");
    }

    let amount = 2;

    if (!isNaN(args[0])) {
      amount = parseInt(args[0]);
      amount < 1 && (amount = 1);
      amount > 15 && (amount = 15);
      args = args.slice(1);
    }

    message.delete().catch(O_o => {});
    let embed = new MessageEmbed().setColor("070707").setDescription(
      args
        .join(" ".repeat(amount / 2))
        .split("")
        .join(" ".repeat(amount))
    );
    message.channel.send(embed);
  }
};
