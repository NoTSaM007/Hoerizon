const discord = require("discord.js"); // fixed enjoi
const client = new discord.Client({
  disableEveryone: true,
  disabledEvents: ["TYPING_START"]
});
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./config.json");
const ascii = require("ascii-table");
const { Cilent, Collection } = require("discord.js");
const table = new ascii("Commands");
const db = require("quick.db");

client.on("ready", () => {
  console.log("Ready To Work. | Bot created by SAM");
  client.user.setActivity("+help | Horizon - A Cᴏᴏʟ Mᴜʟᴛɪ-Pᴜʀᴘᴏsᴇ Bᴏᴛ.");
});

client.on("warn", info => console.log(info));

client.on("error", console.error);
//DEFINIING
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.prefix = PREFIX;
client.queue = new Map();
client.vote = new Map();
client.afk = new Map();
client.snipes = new Map();
client.capitalize = string => {
  let str = "";
  string = string.split(" ");
  for (let i = 0; i < string.length; i++) {
    str +=
      string[i].charAt(0).toUpperCase() +
      string[i].slice(1).toLowerCase() +
      " ";
    if (i == string.length - 1) {
      string = str.split("-");
      str = "";
      for (let i = 0; i < string.length; i++) {
        str += string[i].charAt(0).toUpperCase() + string[i].slice(1) + "-";
        if (i == string.length - 1) {
          return str.slice(0, -2);
        }
      }
    }
  }
};

require("./handlers/command.js")(client);

//WHEN SOMEONE MESSAGE
client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let prefix = await db.fetch(`prefixes_${message.guild.id}`);
  if (!prefix) prefix = PREFIX;

  if (
    message.content === "<@742375154654380082>" ||
    message.content === `<@!${client.user.id}>`
  ) {
    const embed = new discord.MessageEmbed()
      .setColor("00FFFF")
      .setDescription(
        `**Hey, ${message.author}! My Prefix is \`${prefix}\` For This Guild!**`
      )
      .setFooter(`Use \`${prefix}help\` For Commands!`);
    message.channel.send(embed);
  }

  client.on("messageDelete", function(message, channel) {
    client.snipes.set(message.channel.id, {
      content: message.content,
      author: message.author.tag,
      image: message.attachments.first()
        ? message.attachments.first().proxyURL
        : null
    });
  });

  let blacklist = await db.fetch(`blacklist_${message.author.id}`);

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  if (blacklist === "Blacklisted")
    return message.channel.send(
      `${message.author} You are blacklisted from the bot!`
    );

  if (message.content.startsWith(prefix)) {
    //IF MESSSAGE STARTS WITH MINE BOT PREFIX

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/); //removing prefix from args
    const command = args.shift().toLowerCase();

    let cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command));
    if (!cmd) {
      return;
    }

    try {
      cmd.execute(client, message, args);

      //COMMAND LOGS
      const o = client.channels.cache.get("748919962235568330");
      const embed = new discord.MessageEmbed()
        .setTitle("Cᴏᴍᴍᴀɴᴅ Lᴏɢ.")
        .setDescription(
          `Gᴜɪʟᴅ: **\`${message.guild.name}\`**
Cʜᴀɴɴᴇʟ: **\`${message.channel.name}\`**
Exᴇᴄᴜᴛᴏʀ: **${message.author.tag}** 
Cᴏᴍᴍᴀɴᴅ Usᴇᴅ: **\`${command}\`**`
        )
        .setColor("00FFFF")
        .setThumbnail(message.author.avatarURL())
        .setTimestamp();
      o.send(embed);
    } catch (err) {
      //IF IT CATCHES ERROR

      console.log(err);
      const o = client.channels.cache.get("749268670609621122");
      const embed = new discord.MessageEmbed()
        .setTitle("Cᴏᴍᴍᴀɴᴅ Eʀʀᴏʀ.")
        .setDescription(
          `Gᴜɪʟᴅ: **\`${message.guild.name}\`**
Cʜᴀɴɴᴇʟ: **\`${message.channel.name}\`**
Cᴏᴍᴍᴀɴᴅ Nᴀᴍᴇ: **\`${command}\`**
Eʀʀᴏʀ: ${err}`
        )
        .setColor("00FFFF")
        .setThumbnail(message.author.avatarURL())
        .setTimestamp();
      o.send(embed);
    }
  }
});

//DONT DO ANYTHING WITH THIS TOKEN lol
client.login(TOKEN);

const express = require("express");
const app = express();
app.get("/", (req, res) => {
  res.sendStatus(200);
});
app.listen(3000);
