const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "role",
  aliases: ["r"],
  description: "A role utility command",
  category: "Moderation",
  execute: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_ROLES"))
      return message.channel.send(`You do not have Perms!`);

    if (args[0].toLowerCase() == "create") {
      let rName = message.content.split(`${bot.prefix}role create `).join("");

      let rColor;
      args.forEach(arg => {
        if (arg.startsWith("#")) {
          rColor = arg;
        }
      });

      if (!rName) {
        return message.channel.send(
          `You did not specify a name for your role!`
        );
      }

      if (!rColor) {
        return message.channel.send(
          `You did not specify a color for your role!`
        );
      }

      if (rColor >= 16777215)
        return message.channel.send(
          `That hex color range was too big! Keep it between 0 and 16777215`
        );

      if (rColor <= 0)
        return message.channel.send(
          `That hex color range was too small! Keep it between 0 and 16777215`
        );

      rName = rName.replace(`${rColor}`, ``);
      let rNew = await message.guild.roles.create({
        data: {
          name: rName,
          color: rColor
        }
      });
      const Embed = new MessageEmbed()
        .setTitle(`Role Created!`)
        .setDescription(` `)
        .addField(`Role Name:`, rName, true)
        .addField(`Role Id`, rNew.id, true)
        .addField(`Role:`, rNew, true)
        .setColor(rColor);
      message.channel.send(Embed);
    } else if (args[0].toLowerCase() == "delete") {
      let roleDelete =
        message.guild.roles.cache.get(args[1]) ||
        message.guild.roles.cache.find(r => r.name == args[1]);
      if (!roleDelete)
        return message.channel.send(
          `You did not specify the name or id of the role you wish to delete!`
        );
      roleDelete.delete();

      const Embed1 = new MessageEmbed()
        .setTitle(`Role Deleted!`)
        .setColor(roleDelete.color)
        .setDescription(
          `Deleted: \`${roleDelete.name}\`\nID: \`${roleDelete.id}\``
 );
      message.channel.send(Embed1);
    }
  }
};
