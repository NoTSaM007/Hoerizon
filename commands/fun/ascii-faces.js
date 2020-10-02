const fetch = require("node-fetch");
const asciiFaces = require("cool-ascii-faces");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ascii-faces",
  aliases: [""],
  category: "Fun",
  description:
    "Get a ton of super cute copy-and-paste Ascii Faces (◕‿◕)  ʕ´•ᴥ•`ʔ ",
  execute: async (client, msg, args) => {
    var randomSet = getRandomNumber(0, asciiFaces.faces.length - 11);
    var faces = asciiFaces.faces.slice(randomSet, randomSet + 10).join("     ");
    let embed = new MessageEmbed()
      .setTitle("Here are some copy-and-paste :clipboard: ascii faces :eyes:")
      .setDescription(faces)
      .setColor("RANDOM");

    msg.reply(embed);

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
