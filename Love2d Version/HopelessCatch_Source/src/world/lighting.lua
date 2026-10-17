-- src/world/lighting.lua - Ambient Darkness, Lantern Bloom, and Dread Vignette
local Lighting = {}

function Lighting.draw(w, h, dayNight, playerX, playerY)
    local amb = dayNight.getAmbientColor()
    local t = dayNight.time
    
    -- Atmospheric night lighting
    if dayNight.isNight then
        local t = love.timer.getTime()
        local flick = 0.92 + 0.08 * math.sin(t * 8)
        
        -- Soft dark-blue moonlit tint (preserves silhouette & gameplay visibility)
        love.graphics.setColor(0.04, 0.06, 0.14, 0.45)
        love.graphics.rectangle("fill", 0, 0, w, h)
        
        -- Player lantern glow (radiant warm aura illuminating fisherman and water)
        local px = playerX or (w * 0.5)
        local py = (playerY or (h * 0.6)) - 16
        
        love.graphics.setColor(1.0, 0.85, 0.45, 0.22 * flick)
        love.graphics.circle("fill", px, py, 190)
        love.graphics.setColor(1.0, 0.90, 0.60, 0.35 * flick)
        love.graphics.circle("fill", px, py, 95)
        love.graphics.setColor(1.0, 0.96, 0.80, 0.55 * flick)
        love.graphics.circle("fill", px, py, 35)
        
        -- Pier lantern glow (warm light across the wooden dock)
        local dockX = w * 0.32
        local dockW = w * 0.36
        local lx = dockX + dockW - 15
        local ly = (h * 0.62) - 26
        love.graphics.setColor(1.0, 0.75, 0.3, 0.26 * flick)
        love.graphics.circle("fill", lx, ly, 180)
        love.graphics.setColor(1.0, 0.88, 0.5, 0.45 * flick)
        love.graphics.circle("fill", lx, ly, 65)
        
        -- Cabin window glow spilling onto the grass
        local cabinX = w - 240
        local cabinY = (h * 0.62) - 115
        love.graphics.setColor(1.0, 0.65, 0.25, 0.25 * flick)
        love.graphics.circle("fill", cabinX + 87, cabinY + 32, 120)
    end
    
    -- Creeping horror vignette around screen edges
    love.graphics.setColor(0, 0, 0, 0.4)
    love.graphics.setLineWidth(30)
    love.graphics.rectangle("line", 0, 0, w, h)
    love.graphics.setLineWidth(1)
end

return Lighting
