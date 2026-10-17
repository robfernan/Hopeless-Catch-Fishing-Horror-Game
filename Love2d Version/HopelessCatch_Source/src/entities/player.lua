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
    local img = Assets.getImage("player_back") or Assets.getImage("player")
    local bob = (Player.vx ~= 0) and math.sin(Player.walkTimer) * 3 or 0
    
    if img then
        local iw = img:getWidth()
        local ih = img:getHeight()
        -- Target height ~170px for dramatic arcade foreground depth
        local scale = 170 / ih
        love.graphics.setColor(1, 1, 1, 1)
        love.graphics.draw(img, Player.x, Player.y + bob + 4, 0, scale, scale, iw * 0.5, ih)
    else
        love.graphics.setColor(0.18, 0.22, 0.26, 1.0)
        love.graphics.rectangle("fill", Player.x - 20, Player.y - 120 + bob, 40, 120)
    end
end

function Player.getRodTip()
    local bob = (Player.vx ~= 0) and math.sin(Player.walkTimer) * 3 or 0
    -- Tip extends forward and up into the lake view
    return Player.x + 36, Player.y - 148 + bob
end

return Player
