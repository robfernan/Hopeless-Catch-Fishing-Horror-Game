-- src/ui/hud.lua - In-game Retro Horror HUD & Line Tension Meter
local Assets = require("src.core.assets")
local BaitData = require("src.data.baitdata")

local HUD = {}

function HUD.draw(w, h, dayNight, fishingSystem)
    love.graphics.setFont(Assets.fonts.medium)
    
    -- 1. Top-Left: Day & Atmosphere Panel
    love.graphics.setColor(0.04, 0.05, 0.08, 0.85)
    love.graphics.rectangle("fill", 20, 20, 230, 80, 6, 6)
    love.graphics.setColor(0.35, 0.28, 0.22, 0.9)
    love.graphics.rectangle("line", 20, 20, 230, 80, 6, 6)
    
    love.graphics.setColor(0.95, 0.90, 0.82, 1.0)
    love.graphics.print(string.format("DAY %d  •  %s", dayNight.day, dayNight.getClockString()), 32, 28)
    
    love.graphics.setFont(Assets.fonts.small)
    love.graphics.setColor(0.70, 0.65, 0.60, 0.9)
    love.graphics.print(dayNight.getPhase(), 32, 50)
    
    -- Rotten tide warning if escalating
    if dayNight.rottenTideLevel > 1.2 then
        love.graphics.setColor(0.85, 0.25, 0.2, 0.95)
        love.graphics.print(string.format("Rotten Tide: Lv. %.1f", dayNight.rottenTideLevel), 32, 70)
    end
    
    -- 2. Top-Right: Selected Bait Indicator
    local bait = BaitData.getSelected()
    if bait then
        love.graphics.setColor(0.04, 0.05, 0.08, 0.85)
        love.graphics.rectangle("fill", w - 240, 20, 220, 65, 6, 6)
        love.graphics.setColor(0.35, 0.28, 0.22, 0.9)
        love.graphics.rectangle("line", w - 240, 20, 220, 65, 6, 6)
        
        love.graphics.setFont(Assets.fonts.medium)
        love.graphics.setColor(0.95, 0.90, 0.82, 1.0)
        love.graphics.print(string.format("Bait: %s", bait.name), w - 225, 28)
        love.graphics.setFont(Assets.fonts.small)
        love.graphics.setColor(0.75, 0.70, 0.65, 0.9)
        love.graphics.print(string.format("Count: %d  (Key: B to swap)", bait.count), w - 225, 52)
    end
    
    -- 3. Center Status Alerts (Cast / Bite / Fight)
    local fState = fishingSystem.state
    
    if fState == "charging" then
        -- Cast Power Bar
        local barW = 260
        local barX = (w - barW) * 0.5
        local barY = h * 0.75
        
        love.graphics.setColor(0.04, 0.05, 0.08, 0.9)
        love.graphics.rectangle("fill", barX - 4, barY - 4, barW + 8, 26, 4, 4)
        
        love.graphics.setColor(0.2, 0.7, 0.35, 1.0)
        love.graphics.rectangle("fill", barX, barY, barW * fishingSystem.castPower, 18)
        love.graphics.setColor(0.8, 0.8, 0.8, 0.8)
        love.graphics.rectangle("line", barX, barY, barW, 18)
        
        love.graphics.setFont(Assets.fonts.small)
        love.graphics.setColor(0.9, 0.9, 0.9, 1.0)
        love.graphics.printf("RELEASE SPACE TO CAST", barX, barY - 22, barW, "center")
        
    elseif fState == "biting" then
        -- Dramatic Flashing Bite Alert
        local pulse = 0.6 + 0.4 * math.sin(love.timer.getTime() * 16)
        love.graphics.setFont(Assets.fonts.large)
        love.graphics.setColor(1.0, 0.2 * pulse, 0.2 * pulse, 1.0)
        love.graphics.printf("!! BITE DETECTED - HOOK WITH SPACE !!", 0, h * 0.25, w, "center")
        
    elseif fState == "reeling" then
        -- Tension & Reel Progress Meters
        local boxW = 320
        local boxX = (w - boxW) * 0.5
        local boxY = h * 0.18
        
        love.graphics.setColor(0.04, 0.05, 0.08, 0.92)
        love.graphics.rectangle("fill", boxX - 10, boxY - 10, boxW + 20, 105, 6, 6)
        love.graphics.setColor(0.4, 0.2, 0.15, 0.9)
        love.graphics.rectangle("line", boxX - 10, boxY - 10, boxW + 20, 105, 6, 6)
        
        -- Line Tension Bar
        love.graphics.setFont(Assets.fonts.small)
        local tCol = (fishingSystem.tension > 0.8) and {1.0, 0.15, 0.15} or {0.9, 0.75, 0.2}
        love.graphics.setColor(tCol[1], tCol[2], tCol[3], 1.0)
        love.graphics.print("LINE TENSION (HOLD/TAP SPACE)", boxX, boxY)
        
        love.graphics.setColor(0.12, 0.12, 0.14, 1.0)
        love.graphics.rectangle("fill", boxX, boxY + 18, boxW, 14)
        love.graphics.setColor(tCol[1], tCol[2], tCol[3], 1.0)
        love.graphics.rectangle("fill", boxX, boxY + 18, boxW * fishingSystem.tension, 14)
        
        -- Reel Progress Bar
        love.graphics.setColor(0.4, 0.85, 0.4, 1.0)
        love.graphics.print("REEL PROGRESS", boxX, boxY + 42)
        love.graphics.setColor(0.12, 0.12, 0.14, 1.0)
        love.graphics.rectangle("fill", boxX, boxY + 60, boxW, 14)
        love.graphics.setColor(0.35, 0.85, 0.4, 1.0)
        love.graphics.rectangle("fill", boxX, boxY + 60, boxW * fishingSystem.reelProgress, 14)
    end
    
    -- 4. Bottom Controls Reference Bar
    love.graphics.setColor(0.04, 0.05, 0.08, 0.8)
    love.graphics.rectangle("fill", 0, h - 30, w, 30)
    love.graphics.setFont(Assets.fonts.small)
    love.graphics.setColor(0.7, 0.65, 0.6, 0.85)
    love.graphics.printf("WASD: Move  •  SPACE: Cast/Reel  •  B: Bait Box  •  TAB: Journal  •  H: Rest in Cabin  •  ESC: Pause", 0, h - 22, w, "center")
end

return HUD
