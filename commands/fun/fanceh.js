const { MessageEmbed } = require("discord.js");
const mapping = {
  " ": "   ",
  "0": ":zero:",
  "1": ":one:",
  "2": ":two:",
  "3": ":three:",
  "4": ":four:",
  "5": ":five:",
  "6": ":six:",
  "7": ":seven:",
  "8": ":eight:",
  "9": ":nine:",
  "!": ":grey_exclamation:",
  "?": ":grey_question:",
  "#": ":hash:",
  "*": ":asterisk:"
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
  name: "fanceh",
  category: "Fun",
  usage: "fanceh <text>",
  description: "Renders text in big emoji letters",
  execute: function(client, message, args) {
    if (args.length < 1) {
      return message.channel.send("You must provide some text to fanceh-fy!");
    }

    message.delete().catch(O_o => {});
    let embed = new MessageEmbed().setColor("RANDOM").setDescription(
      args
        .join(" ")
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    );
    message.channel.send(embed);
  }
};
