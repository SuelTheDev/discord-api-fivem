const { Client } = require('discord.js')

class DiscordFivem {
  /**
   *  @type Client
   */
  client = null

  /**
   * @type String
   */
  serverId = null

  static EmitEvent (eventName, ...args) {
    emit(eventName, ...args)
  }

  constructor (_client, _serverId) {
    this.client = _client
    this.serverId = _serverId
  }

  async GetUser (userId) {
    return (
      await this.client.guilds.cache.get(this.serverId).members.fetch()
    ).find(member => member.id === userId)
  }

  GetRoles () {
    return this.client.guilds.cache
      .get(this.serverId)
      .roles.cache.sort((a, b) => b.position - a.position)
      .map(r => {
        return { name: r.name, id: r.id }
      })
  }

  GetRoleByName (roleName) {
    return this.GetRoles().find(role => role.name === roleName)
  }

  GetRoleById (roleId) {
    return this.GetRoles().find(role => role.id === roleId)
  }

  /**
   * Verifica se o usuário tá no servidor
   *
   * @param String userId
   * @returns Boolean
   */
  async HasUserInServer (userId) {
    return !!(await this.GetUser(userId))
  }

  /**
   * Adiciona um cargo para o usuário
   *
   * @param String userId
   * @param String roleName
   * @returns Boolean
   */
  async AddRoleToUser (userId, roleName) {
    const user = await this.GetUser(userId)
    try {
      const role = this.GetRoleByName(roleName)
      await user.roles.add(role.id)
      return true
    } catch {}
    return false
  }

  /**
   * Remove um cargo para o usuário
   *
   * @param String userId
   * @param String roleName
   * @returns Boolean
   */
  async RemoveRoleFromUser (userId, roleName) {
    const user = await this.GetUser(userId)
    try {
      const role = this.GetRoleByName(roleName)
      await user.roles.remove(role.id)
      return true
    } catch {}
    return false
  }

  static Create (_client, _serverId, _exports) {
    const fivemExports = new DiscordFivem(_client, _serverId)
    _exports('RemoveRoleFromUser', async (p0, p1) => {
      return fivemExports.RemoveRoleFromUser(p0, p1)
    })
    _exports('AddRoleToUser', async (p0, p1) => {
      return await fivemExports.AddRoleToUser(p0, p1)
    })
    _exports('HasUserInServer', async p0 => {
      return await fivemExports.HasUserInServer(p0)
    })
  }
}

module.exports = DiscordFivem
