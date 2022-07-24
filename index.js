// Require the necessary discord.js classes
'use strict'
const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const path = require('path')
const { token, serverId, clientId } = require('./config.json')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord.js')
const DiscordFivem = require('./fivem/exports')

const resourcePath = GetResourcePath(GetCurrentResourceName())

// Create a new client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages
  ]
})

const commandFiles = fs
  .readdirSync(path.join(resourcePath, 'commands'))
  .filter(file => file.endsWith('.js'))
const commands = []
client.commands = new Collection()
commandFiles.forEach(file => {
  const command = require(path.join(resourcePath, 'commands', file))
  commands.push(command.data.toJSON())
  client.commands.set(command.data.name, command)
})

//Load Events
const eventsPath = path.join(resourcePath, 'events')
const eventsFiles = fs
  .readdirSync(eventsPath)
  .filter(file => file.endsWith('.js'))
eventsFiles.forEach(file => {
  console.log('^1Loaded Events Script: ^0', file)
  const filepath = path.join(eventsPath, file)
  const evt = require(filepath)
  if (evt.once) {
    client.once(evt.name, (...args) => evt.execute(...args))
  } else {
    client.on(evt.name, (...args) => evt.execute(...args))
  }
})

client.once('ready', async () => {
  const rest = new REST({ version: '10' }).setToken(token)
  try {
    await rest.put(Routes.applicationCommands(client.user.id, serverId), {
      body: commands
    })
    DiscordFivem.Create(client, serverId, exports)   
    DiscordFivem.EmitEvent('discord:ready')
    console.log('Comandos registrados com sucesso.')
  } catch (err) {
    console.log(err)
    console.log('Falha no registro dos comandos.')
  }
})

client.login(token)