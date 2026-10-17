-- src/ui/tacklebox.lua - Bait Selection Grid Modal
local Assets = require("src.core.assets")
local BaitData = require("src.data.baitdata")

local TackleBox = {}

function TackleBox.draw(w, h)
    love.graphics.setColor(0.01, 0.01, 0.02, 0.88)
    love.graphics.rectangle("fill", 0, 0, w, h)
    
    local modalW = 540
    local modalH = 380
    local mx = (w - modalW) * 0.5
    local my = (h - modalH) * 0.5
    
    love.graphics.setColor(0.06, 0.07, 0.10, 0.98)
    love.graphics.rectangle("fill", mx, my, modalW, modalH, 8, 8)
    love.graphics.setColor(0.45, 0.35, 0.25, 1.0)
    love.graphics.rectangle("line", mx, my, modalW, modalH, 8, 8)
    
    love.graphics.setFont(Assets.fonts.large)
    love.graphics.setColor(0.95, 0.85, 0.70, 1.0)
    love.graphics.printf("TACKLE & BAIT BOX", mx, my + 18, modalW, "center")
    
    -- List Bait Items
    local startY = my + 65
    for i, b in ipairs(BaitData.inventory) do
        local isSel = (i == BaitData.selectedIdx)
        local iy = startY + (i - 1) * 55
        
        if isSel then
            love.graphics.setColor(0.35, 0.16, 0.12, 0.9)
            love.graphics.rectangle("fill", mx + 20, iy, modalW - 40, 48, 6, 6)
            love.graphics.setColor(0.85, 0.35, 0.22, 1.0)
            love.graphics.rectangle("line", mx + 20, iy, modalW - 40, 48, 6, 6)
        else
            love.graphics.setColor(0.12, 0.12, 0.15, 0.7)
            love.graphics.rectangle("fill", mx + 20, iy, modalW - 40, 48, 6, 6)
        end
        
        -- Bait Sprite
        local img = Assets.getImage(b.asset)
        if img then
            love.graphics.setColor(1, 1, 1, 1)
            love.graphics.draw(img, mx + 32, iy + 8, 0, 2.0, 2.0)
        end
        
        love.graphics.setFont(Assets.fonts.medium)
        love.graphics.setColor(isSel and {1, 0.95, 0.85} or {0.8, 0.78, 0.75})
        love.graphics.print(string.format("%s  (x%d)", b.name, b.count), mx + 85, iy + 6)
        
        love.graphics.setFont(Assets.fonts.small)
        love.graphics.setColor(0.65, 0.60, 0.55, 0.9)
        love.graphics.print(b.desc, mx + 85, iy + 28)
    end
    
    love.graphics.setFont(Assets.fonts.small)
    love.graphics.setColor(0.6, 0.58, 0.52, 0.9)
    love.graphics.printf("↑↓ Navigate  •  ENTER / B Select & Close", mx, my + modalH - 26, modalW, "center")
end

function TackleBox.updateInput(input)
    if input.isPressed("up") then
        BaitData.selectedIdx = math.max(1, BaitData.selectedIdx - 1)
    elseif input.isPressed("down") then
        BaitData.selectedIdx = math.min(#BaitData.inventory, BaitData.selectedIdx + 1)
    end
end

return TackleBox
