-- src/world/lighting.lua - Ambient Darkness, Lantern Bloom, and Dread Vignette
local Lighting = {}

function Lighting.draw(w, h, dayNight, playerX, playerY)
    local amb = dayNight.getAmbientColor()
    local t = dayNight.time
    
    -- Night darkness overlay
    if dayNight.isNight then
        local nightAlpha = 0.72
        
        -- Darkness canvas with light cutouts
        love.graphics.setColor(0.01, 0.02, 0.04, nightAlpha)
        love.graphics.rectangle("fill", 0, 0, w, h)
        
        -- Player lantern glow
        local px = playerX or (w * 0.5)
        local py = playerY or (h * 0.6)
        
        local flick = 0.9 + 0.1 * math.sin(love.timer.getTime() * 10)
        love.graphics.setColor(1.0, 0.85, 0.45, 0.18 * flick)
        love.graphics.circle("fill", px, py, 110)
        love.graphics.setColor(1.0, 0.90, 0.60, 0.32 * flick)
        love.graphics.circle("fill", px, py, 50)
        
        -- Pier lantern glow
        local dockX = w * 0.32
        local dockW = w * 0.36
        local lx = dockX + dockW - 15
        local ly = (h * 0.62) - 26
        love.graphics.setColor(1.0, 0.75, 0.3, 0.22 * flick)
        love.graphics.circle("fill", lx, ly, 130)
    end
    
    -- Creeping horror vignette around screen edges
    love.graphics.setColor(0, 0, 0, 0.4)
    love.graphics.setLineWidth(30)
    love.graphics.rectangle("line", 0, 0, w, h)
    love.graphics.setLineWidth(1)
end

return Lighting
