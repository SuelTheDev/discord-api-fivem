module.exports = {
    name: 'guildMemberRemove',
    on: true,
    execute: (member, fivemexports) => {
        emit("discord:memberLeave", member.id, member.displayName)
    }
}