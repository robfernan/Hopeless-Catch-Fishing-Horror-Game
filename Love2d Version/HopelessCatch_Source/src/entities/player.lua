-- src/entities/player.lua - Fisherman Entity, Animation, and Rod Anchor
local Assets = require("src.core.assets")

local Player = {
    x = 450,
    y = 380,
    vx = 0,
    speed = 180,
    facing = 1, -- 1 = right, -1 = left
    isFishing = false,
    walkTimer = 0
}

function Player.init(startX, startY)
    Player.x = startX or 450
    Player.y = startY or 380
    Player.vx = 0
    Player.facing = 1
    Player.isFishing = false
end

function Player.update(dt, input, canMove, minX, maxX)
    if not canMove then
        Player.vx = 0
        return
    end
    
    local move = 0
    if input.isDown("left") then move = move - 1 end
    if input.isDown("right") then move = move + 1 end
    
    if move ~= 0 then
        Player.facing = move
        Player.vx = move * Player.speed
        Player.walkTimer = Player.walkTimer + dt * 8
    else
        Player.vx = 0
    end
    
    Player.x = Player.x + Player.vx * dt
    if minX and Player.x < minX then Player.x = minX end
    if maxX and Player.x > maxX then Player.x = maxX end
end

function Player.draw()
    local img = Assets.getImage("player")
    local bob = (Player.vx ~= 0) and math.sin(Player.walkTimer) * 3 or 0
    
    if img then
        local ox = img:getWidth() / 2
        local oy = img:getHeight()
        love.graphics.setColor(1, 1, 1, 1)
        love.graphics.draw(img, Player.x, Player.y + bob, 0, Player.facing * 1.5, 1.5, ox, oy)
    else
        -- High-detail fallback fisherman silhouette
        love.graphics.setColor(0.18, 0.22, 0.26, 1.0)
        love.graphics.rectangle("fill", Player.x - 10, Player.y - 42 + bob, 20, 42)
        -- Yellow rain slicker hood
        love.graphics.setColor(0.85, 0.72, 0.25, 1.0)
        love.graphics.circle("fill", Player.x, Player.y - 46 + bob, 9)
    end
    
    -- Fishing Rod
    local tipX, tipY = Player.getRodTip()
    love.graphics.setColor(0.35, 0.25, 0.18, 1.0)
    love.graphics.setLineWidth(2)
    love.graphics.line(Player.x + (Player.facing * 4), Player.y - 25 + bob, tipX, tipY)
    love.graphics.setLineWidth(1)
end

function Player.getRodTip()
    local bob = (Player.vx ~= 0) and math.sin(Player.walkTimer) * 3 or 0
    return Player.x + (Player.facing * 32), Player.y - 52 + bob
end

return Player
