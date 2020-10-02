module.exports = {
  name: "triggered",
  aliases: [],
  category: "Image",
  execute: async (client, message, args) => {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        u => u.user.username === args.join(" ")
      ) ||
      message.member;

    return message.channel.send({
      files: [
        {
          attachment:
            "https://some-random-api.ml/canvas/triggered?avatar=" +
            member.user.displayAvatarURL({ format: "png", size: 2048 }),
          name: "triggered.gif"
        }
      ]
    });
  }
};
