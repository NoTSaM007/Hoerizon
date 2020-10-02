const figlet = require("figlet");

module.exports = {
  name: "ascii",
  category: "Fun",
  description: "Converts text to ascii",
  execute: async (client, message, args) => {
    let text = args.slice(0).join(" ");

    if (!args[0]) return message.channel.send("Please provide some text!");

    figlet.text(text, function(err, data) {
      if (err) {
        console.log("Something went wrong");
        console.dir(err);
      }
      if (data.length > 2000)
        return message.channel.send(
          "Please provide text shorter than 2000 characters"
        );

      message.channel.send("```" + data + "```");
    });
  }
};
