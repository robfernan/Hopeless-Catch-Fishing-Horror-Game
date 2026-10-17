-- src/world/terrain.lua - Shoreline, Dilapidated Cabin, and Wooden Pier
local Terrain = {}

function Terrain.draw(w, h, dayNight)
    local amb = dayNight.getAmbientColor()
    local waterY = h * 0.62
    local grassY = waterY - 50
    
    -- Distant Mountains
    love.graphics.setColor(amb[1] * 0.45, amb[2] * 0.45, amb[3] * 0.6, 0.85)
    local mountainPoly = {
        0, waterY,
        w * 0.15, waterY - 110,
        w * 0.35, waterY - 70,
        w * 0.55, waterY - 140,
        w * 0.80, waterY - 60,
        w, waterY - 100,
        w, waterY,
        0, waterY
    }
    love.graphics.polygon("fill", mountainPoly)
    
    -- Silhouette Pine Trees along ridge
    love.graphics.setColor(amb[1] * 0.3, amb[2] * 0.35, amb[3] * 0.4, 0.95)
    for x = 20, w, 35 do
        local treeHeight = 28 + (x % 7) * 4
        love.graphics.polygon("fill", x - 10, grassY + 10, x + 10, grassY + 10, x, grassY + 10 - treeHeight)
    end
    
    -- Shoreline Grass / Soil
    love.graphics.setColor(amb[1] * 0.35, amb[2] * 0.5, amb[3] * 0.35, 1.0)
    love.graphics.rectangle("fill", 0, grassY, w, waterY - grassY)
    
    -- Muddy bank edge
    love.graphics.setColor(0.18 * amb[1], 0.14 * amb[2], 0.10 * amb[3], 1.0)
    love.graphics.rectangle("fill", 0, waterY - 8, w, 8)
    
    -- Dilapidated Cabin on the right
    local cabinX = w - 240
    local cabinY = grassY - 65
    -- Cabin body
    love.graphics.setColor(0.28, 0.22, 0.18, 1.0)
    love.graphics.rectangle("fill", cabinX, cabinY, 130, 80)
    -- Roof
    love.graphics.setColor(0.18, 0.12, 0.10, 1.0)
    love.graphics.polygon("fill", cabinX - 15, cabinY, cabinX + 65, cabinY - 45, cabinX + 145, cabinY)
    -- Chimney
    love.graphics.setColor(0.22, 0.15, 0.12, 1.0)
    love.graphics.rectangle("fill", cabinX + 15, cabinY - 50, 18, 30)
    -- Glowing window (flickers in darkness)
    local flick = 0.85 + 0.15 * math.sin(love.timer.getTime() * 4)
    if dayNight.isNight then
        love.graphics.setColor(0.95, 0.65, 0.25, 0.85 * flick)
    else
        love.graphics.setColor(0.4, 0.45, 0.5, 0.7)
    end
    love.graphics.rectangle("fill", cabinX + 75, cabinY + 20, 24, 24)
    -- Cabin Door
    love.graphics.setColor(0.12, 0.08, 0.06, 1.0)
    love.graphics.rectangle("fill", cabinX + 25, cabinY + 28, 26, 52)
    
    -- Wooden Fishing Pier / Dock stretching into the water
    local dockX = w * 0.32
    local dockW = w * 0.36
    local dockY = waterY - 6
    
    -- Dock pilings
    love.graphics.setColor(0.15, 0.11, 0.08, 1.0)
    for px = dockX + 20, dockX + dockW - 10, 45 do
        love.graphics.rectangle("fill", px, dockY, 10, 50)
    end
    
    -- Dock planks
    love.graphics.setColor(0.32, 0.24, 0.16, 1.0)
    love.graphics.rectangle("fill", dockX, dockY, dockW, 14)
    
    -- Rusted Dock Lantern
    local lanternX = dockX + dockW - 15
    local lanternY = dockY - 26
    love.graphics.setColor(0.15, 0.15, 0.15, 1.0)
    love.graphics.rectangle("fill", lanternX, lanternY, 6, 26)
    love.graphics.circle("fill", lanternX + 3, lanternY, 6)
    -- Lantern Flame
    local lFlick = 0.8 + 0.2 * math.sin(love.timer.getTime() * 12)
    love.graphics.setColor(1.0, 0.75, 0.3, 0.9 * lFlick)
    love.graphics.circle("fill", lanternX + 3, lanternY + 8, 4)
end

function Terrain.getDockBounds(w, h)
    local waterY = h * 0.62
    local dockX = w * 0.32
    local dockW = w * 0.36
    return dockX, dockX + dockW, waterY - 20
end

return Terrain
