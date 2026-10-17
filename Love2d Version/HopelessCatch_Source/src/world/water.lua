-- src/world/water.lua - Procedural Multi-layer Water, Wave Ripples, and Rotten Tide Surface
local Water = {
    timer = 0
}

function Water.update(dt)
    Water.timer = Water.timer + dt
end

function Water.draw(w, h, dayNight)
    local waterY = h * 0.62
    local amb = dayNight.getAmbientColor()
    local t = Water.timer
    
    -- Rotten Tide color shift (turns water murkier, blacker, and greenish-red)
    local tideRot = math.min(1.0, (dayNight.rottenTideLevel - 1.0) * 0.5)
    local waterR = amb[1] * 0.12 * (1 - tideRot) + 0.15 * tideRot
    local waterG = amb[2] * 0.22 * (1 - tideRot) + 0.08 * tideRot
    local waterB = amb[3] * 0.35 * (1 - tideRot) + 0.05 * tideRot
    
    -- Deep water body
    love.graphics.setColor(waterR, waterG, waterB, 0.94)
    love.graphics.rectangle("fill", 0, waterY, w, h - waterY)
    
    -- Sub-surface murky gradient
    love.graphics.setColor(0, 0, 0, 0.55)
    love.graphics.rectangle("fill", 0, waterY + 40, w, h - (waterY + 40))
    
    -- Animated procedural sine ripples
    local rippleColor = {amb[1] * 0.5, amb[2] * 0.65, amb[3] * 0.85, 0.45}
    if tideRot > 0.3 then
        rippleColor = {0.35, 0.15, 0.12, 0.5} -- Rotten Tide foam
    end
    
    for row = 0, 6 do
        local ry = waterY + 8 + row * 16
        local freq = 0.015 + row * 0.005
        local speed = (row % 2 == 0) and 1.2 or -0.9
        
        love.graphics.setColor(rippleColor[1], rippleColor[2], rippleColor[3], rippleColor[4] * (1 - row/8))
        for x = 0, w, 24 do
            local wave = math.sin((x * freq) + (t * speed) + row) * 3
            love.graphics.rectangle("fill", x, ry + wave, 14, 2)
        end
    end
    
    -- Forbidden Waters Warning Buoy line (far left)
    local buoyX = w * 0.14
    local buoyBob = math.sin(t * 2.2) * 4
    love.graphics.setColor(0.75, 0.2, 0.15, 1.0)
    love.graphics.circle("fill", buoyX, waterY + 12 + buoyBob, 7)
    love.graphics.setColor(0.9, 0.9, 0.9, 0.8)
    love.graphics.rectangle("fill", buoyX - 1, waterY + 4 + buoyBob, 2, 8)
end

return Water
