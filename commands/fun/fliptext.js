const { MessageEmbed } = require("discord.js");
const mapping =
  "¡\"#$%⅋,)(*+'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~";
// Start with the character '!'
const OFFSET = "!".charCodeAt(0);

module.exports = {
  name: "fliptext",
  usage: "fliptext <text>",
  description: "Flips your text!",
  category: "Fun",
  execute: function(client, message, args) {
    if (args.length < 1) {
      return message.channel.send("You must provide text to flip!");
    }

    message.delete().catch(O_o => {});
    let embed = new MessageEmbed().setColor("070707").setDescription(
      args
        .join(" ")
        .split("")
        .map(c => c.charCodeAt(0) - OFFSET)
        .map(c => mapping[c] || " ")
        .reverse()
        .join("")
    );
    message.channel.send(embed);
  }
};
