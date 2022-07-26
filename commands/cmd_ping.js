const { SlashCommandBuilder } = require('discord.js')
module.exports = {
  data: new SlashCommandBuilder()
    .setName('pingg')
    .setDescription('Replies with ping'),
  execute: async (interaction, fivemexports) => {
    await interaction.reply('Pong!')
  }
}
