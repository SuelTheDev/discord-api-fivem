module.exports = {
    name: 'guildMemberRemove',
    on: true,
    execute: (member) => {
        emit("discord:memberLeave", member.id, member.displayName)
    }
}