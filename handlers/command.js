const ascii = require("ascii-table");
const table = new ascii("Commands");
table.setHeading("Command", "Load Status");
const { readdirSync } = require("fs");

module.exports = async client => {
  readdirSync("./commands/").forEach(dir => {
    let commands = readdirSync(`./commands/${dir}/`)
      .filter(f => f.endsWith(".js"))
      .forEach(cmd => {
        let pull = require(`../commands/${dir}/${cmd}`);
        table.addRow(pull.name, "✅");
        client.commands.set(pull.name, pull);
        if (pull.aliases && Array.isArray(pull.aliases)) {
          pull.aliases.forEach(alias => {
            client.aliases.set(alias, pull.name);
          });
        }
      });
  });
  console.log(table.toString());
};
