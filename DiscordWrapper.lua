--cache
-- local promise = promise
local discord = exports['discord']
-- local Await = Citizen.Await
-- local GetCurrentResourceName = GetCurrentResourceName

Discord = {}

---Verifica se o usuário se encontra no servidor
---@param discordUserId string
---@return boolean
function Discord:HasUserInServer(discordUserId)
    if discordUserId then
        return discord:HasUserInServer(discordUserId)
    end
    return false
end

---Adiciona um cargo para o usuário
---@param userid string
---@param rolename string
function Discord:AddRoleToUser(userid, rolename)
    if userid and rolename then
        return discord:AddRoleToUser(userid, rolename)
    end
end

---Remove um cargo para o usuário
---@param userid string
---@param rolename string
function Discord:RemoveRoleFromUser(userid, rolename)
    if userid and rolename then
        return discord:RemoveRoleFromUser(userid, rolename)
    end
end