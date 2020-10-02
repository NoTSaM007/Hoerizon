const ms = require("ms");
const { MessageEmbed } = require("discord.js");
const { Timers } = require("../../variable.js");
module.exports = {
  name: "timer",
  aliases: ["remindme"],
  description: "Set a timer for your self!",
  usage: "<#d/h/m>",
  category: "Utility",
  execute: async (bot, message, args) => {
    let reason = args.slice(1).join(" ");

    if (!args[0]) {
      return message.channel.send(
        `You did not specify the amount of time you wish to set a timer for!`
      );
    }
    if (!args[0].endsWith("d")) {
      if (!args[0].endsWith("h")) {
        if (!args[0].endsWith("m")) {
          if (!args[0].endsWith("s")) {
            return message.channel.send(
              `You did not use the proper format for the the time!`
            );
          }
        }
      }
    }

    if (isNaN(args[0][0])) {
      return message.channel.send(`That is not a number!`);
    }
    Timers.set(message.author.id + " G " + message.guild.name, {
      Guild: message.guild.name,
      Author: {
        Tag: message.author.tag,
        ID: message.author.id
      },
      Time: ms(args[0])
    });
    message.channel.send(
      `**Set Timer For: \`${args[0]}\` For \`${reason || "No Reason"}\`**`
    );
    setTimeout(() => {
      let Embed = new MessageEmbed()
        .setTitle(`Timer Ended`)
        .setDescription(
          `**Guild Name:** ${message.guild.name}\n` +
            `**Timer:** ${args[0]}\n` +
            `**Reason:** \`${reason || "No Reason"}\`\n` +
            `**Channel:** <#${message.channel.id}>`
        )
        .setColor(`GREEN`);
      message.author.send(Embed);
      Timers.delete(message.author.id + " G " + message.guild.name);
    }, ms(args[0]));
  }
};
