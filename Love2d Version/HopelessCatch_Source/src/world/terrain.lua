-- src/world/terrain.lua - Shoreline, Dilapidated Cabin, and Wooden Pier
local Terrain = {}

function Terrain.draw(w, h, dayNight)
    local amb = dayNight.getAmbientColor()
    local horizonY = h * 0.46
    
    -- Distant Mountain Ridges across the far lake
    love.graphics.setColor(amb[1] * 0.35, amb[2] * 0.42, amb[3] * 0.55, 0.90)
    local mountainPoly = {
        0, horizonY,
        w * 0.18, horizonY - 80,
        w * 0.40, horizonY - 45,
        w * 0.65, horizonY - 110,
        w * 0.88, horizonY - 55,
        w, horizonY - 75,
        w, horizonY,
        0, horizonY
    }
    love.graphics.polygon("fill", mountainPoly)
    
    -- Distant Forested shoreline along the horizon
    love.graphics.setColor(amb[1] * 0.25, amb[2] * 0.32, amb[3] * 0.28, 1.0)
    love.graphics.rectangle("fill", 0, horizonY - 8, w, 8)
    for x = 10, w, 28 do
        local th = 16 + (x % 5) * 4
        love.graphics.polygon("fill", x - 8, horizonY, x + 8, horizonY, x, horizonY - th)
    end
    
    -- Foreground Pier (Sega Bass Fishing perspective - projecting from bottom center outward)
    local pierFarW = 140
    local pierNearW = 340
    local pierFarY = horizonY + 80
    local pierNearY = h + 10
    
    local px1 = (w - pierNearW) * 0.5
    local px2 = (w + pierNearW) * 0.5
    local fx1 = (w - pierFarW) * 0.5
    local fx2 = (w + pierFarW) * 0.5
    
    -- Pier shadow into water
    love.graphics.setColor(0.02, 0.04, 0.06, 0.6)
    love.graphics.polygon("fill", px1 - 25, pierNearY, px2 + 25, pierNearY, fx2 + 10, pierFarY, fx1 - 10, pierFarY)
    
    -- Heavy wooden pilings underneath
    love.graphics.setColor(0.12, 0.08, 0.06, 1.0)
    love.graphics.rectangle("fill", fx1 + 8, pierFarY, 14, 45)
    love.graphics.rectangle("fill", fx2 - 22, pierFarY, 14, 45)
    
    -- Wooden deck surface in perspective
    love.graphics.setColor(0.32, 0.24, 0.16, 1.0)
    love.graphics.polygon("fill", px1, pierNearY, px2, pierNearY, fx2, pierFarY, fx1, pierFarY)
    
    -- Perspective Wood Planks
    love.graphics.setColor(0.18, 0.12, 0.08, 0.75)
    love.graphics.setLineWidth(2)
    local numPlanks = 16
    for i = 1, numPlanks do
        local frac = (i / numPlanks)^1.6 -- perspective curve
        local y = pierFarY + (pierNearY - pierFarY) * frac
        local leftX = fx1 + (px1 - fx1) * frac
        local rightX = fx2 + (px2 - fx2) * frac
        love.graphics.line(leftX, y, rightX, y)
    end
    love.graphics.setLineWidth(1)
    
    -- Pier edge railings / posts
    love.graphics.setColor(0.24, 0.17, 0.11, 1.0)
    love.graphics.rectangle("fill", px1 - 6, pierNearY - 140, 16, 140)
    love.graphics.rectangle("fill", px2 - 10, pierNearY - 140, 16, 140)
    love.graphics.rectangle("fill", fx1 - 4, pierFarY - 50, 10, 50)
    love.graphics.rectangle("fill", fx2 - 6, pierFarY - 50, 10, 50)
    
    -- Pier Lantern on left post
    local lx = px1 + 2
    local ly = pierNearY - 145
    love.graphics.setColor(0.15, 0.15, 0.15, 1.0)
    love.graphics.rectangle("fill", lx, ly, 8, 22)
    love.graphics.circle("fill", lx + 4, ly, 6)
    local lFlick = 0.8 + 0.2 * math.sin(love.timer.getTime() * 10)
    love.graphics.setColor(1.0, 0.75, 0.3, 0.9 * lFlick)
    love.graphics.circle("fill", lx + 4, ly + 8, 5)
end

function Terrain.getDockBounds(w, h)
    local horizonY = h * 0.46
    local pierFarY = horizonY + 80
    local pierNearY = h - 35
    local minX = w * 0.5 - 90
    local maxX = w * 0.5 + 90
    return minX, maxX, pierNearY, pierFarY
end

return Terrain
