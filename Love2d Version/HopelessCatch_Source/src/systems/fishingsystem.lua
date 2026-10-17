-- src/systems/fishingsystem.lua - Cast Physics, Waiting Tension, and Reeling Battle
local Assets = require("src.core.assets")
local FishData = require("src.data.fishdata")
local BaitData = require("src.data.baitdata")

local FishingSystem = {
    state = "idle", -- "idle", "charging", "flying", "bobbing", "biting", "reeling", "caught"
    castPower = 0,
    castDir = 1,
    bobber = { x = 0, y = 0, targetX = 0, targetY = 0 },
    
    biteTimer = 0,
    biteWindow = 0,
    currentFish = nil,
    
    -- Reeling mini-game mechanics
    tension = 0.2,       -- 0.0 to 1.0 (danger above 0.8)
    reelProgress = 0.0,  -- 0.0 to 1.0 (win at 1.0)
    fishPull = 0,
    fishPullTimer = 0,
    
    caughtFish = nil,
    stats = { totalCaught = 0, totalLost = 0 }
}

function FishingSystem.reset()
    FishingSystem.state = "idle"
    FishingSystem.castPower = 0
    FishingSystem.tension = 0.2
    FishingSystem.reelProgress = 0.0
    FishingSystem.currentFish = nil
    FishingSystem.caughtFish = nil
end

function FishingSystem.update(dt, input, player, dayNight, waterY)
    local state = FishingSystem.state
    
    if state == "idle" then
        if input.isPressed("action") then
            local b = BaitData.getSelected()
            if b and b.count > 0 then
                FishingSystem.state = "charging"
                FishingSystem.castPower = 0
            end
        end
        
    elseif state == "charging" then
        if input.isDown("action") then
            FishingSystem.castPower = math.min(1.0, FishingSystem.castPower + dt * 1.4)
        else
            -- Release cast forward into the lake!
            FishingSystem.state = "flying"
            local tipX, tipY = player.getRodTip()
            FishingSystem.bobber.x = tipX
            FishingSystem.bobber.y = tipY
            
            -- Higher power throws deeper into the lake toward the horizon
            local lakeDepthY = (waterY + 120) - (FishingSystem.castPower * 140)
            local spreadX = player.x + (math.random() - 0.5) * (80 + FishingSystem.castPower * 160)
            
            FishingSystem.bobber.targetX = spreadX
            FishingSystem.bobber.targetY = lakeDepthY
            
            BaitData.consumeSelected()
            Assets.play("splash", 0.1, 0.4)
        end
        
    elseif state == "flying" then
        local b = FishingSystem.bobber
        b.x = b.x + (b.targetX - b.x) * dt * 7
        b.y = b.y + (b.targetY - b.y) * dt * 7
        
        if math.abs(b.x - b.targetX) < 5 and math.abs(b.y - b.targetY) < 5 then
            FishingSystem.state = "bobbing"
            Assets.play("splash", 0.2, 0.8)
            -- Roll bite delay between 3 and 7 seconds
            FishingSystem.biteTimer = 3.0 + math.random() * 4.0
        end
        
    elseif state == "bobbing" then
        FishingSystem.biteTimer = FishingSystem.biteTimer - dt
        if FishingSystem.biteTimer <= 0 then
            FishingSystem.state = "biting"
            FishingSystem.biteWindow = 1.3 -- Reaction window in seconds
            Assets.play("bite_stinger", 0.0, 1.0)
            
            -- Determine if hooked in Forbidden Waters (far left buoy zone)
            local isForbidden = (FishingSystem.bobber.x < 240)
            local bait = BaitData.getSelected()
            FishingSystem.currentFish = FishData.selectFish(dayNight.isNight, isForbidden, bait and bait.id)
        end
        
    elseif state == "biting" then
        FishingSystem.biteWindow = FishingSystem.biteWindow - dt
        
        if input.isPressed("action") then
            -- Successfully hooked!
            FishingSystem.state = "reeling"
            FishingSystem.tension = 0.35
            FishingSystem.reelProgress = 0.05
            FishingSystem.fishPullTimer = 0.5
        elseif FishingSystem.biteWindow <= 0 then
            -- Missed bite
            FishingSystem.state = "idle"
            FishingSystem.stats.totalLost = FishingSystem.stats.totalLost + 1
        end
        
    elseif state == "reeling" then
        local diff = FishingSystem.currentFish.difficulty or 2
        
        -- Fish pulling behavior
        FishingSystem.fishPullTimer = FishingSystem.fishPullTimer - dt
        if FishingSystem.fishPullTimer <= 0 then
            FishingSystem.fishPull = (math.random() < 0.6) and (0.6 + diff * 0.18) or 0
            FishingSystem.fishPullTimer = 0.8 + math.random() * 1.2
        end
        
        -- Player reeling
        if input.isDown("action") then
            FishingSystem.tension = FishingSystem.tension + (0.55 + FishingSystem.fishPull * 0.5) * dt
            FishingSystem.reelProgress = FishingSystem.reelProgress + (0.45 / diff) * dt
            if math.random() < 0.3 then Assets.play("reel_click", 0.1, 0.4) end
        else
            -- Tension relieves when not reeling
            FishingSystem.tension = math.max(0.05, FishingSystem.tension - 0.75 * dt)
        end
        
        -- Line snapped condition
        if FishingSystem.tension >= 1.0 then
            Assets.play("line_snap", 0.0, 1.0)
            FishingSystem.state = "idle"
            FishingSystem.stats.totalLost = FishingSystem.stats.totalLost + 1
        -- Catch condition
        elseif FishingSystem.reelProgress >= 1.0 then
            FishingSystem.state = "caught"
            FishingSystem.caughtFish = FishingSystem.currentFish
            FishingSystem.stats.totalCaught = FishingSystem.stats.totalCaught + 1
            Assets.play("splash", 0.2, 0.9)
        end
    end
end

function FishingSystem.draw(player)
    local state = FishingSystem.state
    local tipX, tipY = player.getRodTip()
    
    if state == "charging" then
        -- Cast trajectory preview line aiming forward toward horizon
        love.graphics.setColor(1, 1, 1, 0.45)
        love.graphics.setLineWidth(1)
        local targetY = (love.graphics.getHeight() * 0.46 + 120) - (FishingSystem.castPower * 140)
        love.graphics.line(tipX, tipY, player.x, targetY)
        
    elseif state == "flying" or state == "bobbing" or state == "biting" or state == "reeling" then
        local bx = FishingSystem.bobber.x
        local by = FishingSystem.bobber.y
        
        -- Subtle bob in water
        if state == "bobbing" or state == "reeling" then
            by = by + math.sin(love.timer.getTime() * 4) * 2
        elseif state == "biting" then
            by = by + math.sin(love.timer.getTime() * 22) * 6 -- violent thrashing
        end
        
        -- Fishing Line (curved bezier curve)
        local ctrlX = (tipX + bx) * 0.5
        local ctrlY = math.min(tipY, by) + (state == "reeling" and 10 or 35)
        local curve = love.math.newBezierCurve(tipX, tipY, ctrlX, ctrlY, bx, by)
        
        love.graphics.setColor(0.9, 0.9, 0.95, 0.65)
        love.graphics.setLineWidth(1)
        love.graphics.line(curve:render())
        
        -- Bobber (Red & White floating float)
        love.graphics.setColor(0.85, 0.15, 0.15, 1.0)
        love.graphics.circle("fill", bx, by - 2, 4)
        love.graphics.setColor(1.0, 1.0, 1.0, 1.0)
        love.graphics.circle("fill", bx, by + 2, 4)
        
        -- Water splash ripple around bobber
        if state == "biting" then
            love.graphics.setColor(1, 0.2, 0.2, 0.8)
            love.graphics.circle("line", bx, by, 12 + math.sin(love.timer.getTime() * 15) * 4)
        end
    end
end

return FishingSystem
