module.exports = {
  name: 'interactionCreate',
  on: true,
  execute: async (interaction, fivemexports) => {
    if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);		
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
  }
}
