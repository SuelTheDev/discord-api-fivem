const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('pingg')
    .setDescription('Replies with ping'),
  execute: async (interaction) => {
    await interaction.reply('Pong!')
  }
}
