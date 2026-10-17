-- src/ui/journal.lua - Field Log with Catches, Secrets, and Jam Themes
local Assets = require("src.core.assets")

local Journal = {
    entries = {},
    selectedDay = 1
}

function Journal.addCatch(day, fish)
    table.insert(Journal.entries, {
        day = day,
        name = fish.name,
        desc = fish.desc,
        narrative = fish.nightNarrative,
        time = os.date("%H:%M")
    })
end

function Journal.draw(w, h, currentDay)
    love.graphics.setColor(0.01, 0.01, 0.02, 0.88)
    love.graphics.rectangle("fill", 0, 0, w, h)
    
    local modalW = 600
    local modalH = 440
    local mx = (w - modalW) * 0.5
    local my = (h - modalH) * 0.5
    
    love.graphics.setColor(0.06, 0.07, 0.10, 0.98)
    love.graphics.rectangle("fill", mx, my, modalW, modalH, 8, 8)
    love.graphics.setColor(0.45, 0.35, 0.25, 1.0)
    love.graphics.rectangle("line", mx, my, modalW, modalH, 8, 8)
    
    love.graphics.setFont(Assets.fonts.large)
    love.graphics.setColor(0.95, 0.85, 0.70, 1.0)
    love.graphics.printf("FISHERMAN'S FIELD JOURNAL", mx, my + 18, modalW, "center")
    
    -- Subtitle
    love.graphics.setFont(Assets.fonts.small)
    love.graphics.setColor(0.7, 0.45, 0.4, 0.9)
    love.graphics.printf("Records of the Rotten Tide & Forbidden Waters", mx, my + 46, modalW, "center")
    
    -- Entries List
    local startY = my + 75
    if #Journal.entries == 0 then
        love.graphics.setFont(Assets.fonts.medium)
        love.graphics.setColor(0.55, 0.52, 0.48, 0.8)
        love.graphics.printf("No records logged yet. Cast your line into the lake.", mx, my + 180, modalW, "center")
    else
        for i = math.max(1, #Journal.entries - 4), #Journal.entries do
            local e = Journal.entries[i]
            local iy = startY + (i - math.max(1, #Journal.entries - 4)) * 65
            
            love.graphics.setColor(0.12, 0.12, 0.16, 0.8)
            love.graphics.rectangle("fill", mx + 25, iy, modalW - 50, 56, 4, 4)
            
            love.graphics.setFont(Assets.fonts.medium)
            love.graphics.setColor(0.9, 0.85, 0.75, 1.0)
            love.graphics.print(string.format("Day %d — %s", e.day, e.name), mx + 38, iy + 6)
            
            love.graphics.setFont(Assets.fonts.small)
            love.graphics.setColor(0.65, 0.60, 0.55, 0.9)
            local note = e.narrative or e.desc
            love.graphics.print(note, mx + 38, iy + 30)
        end
    end
    
    love.graphics.setFont(Assets.fonts.small)
    love.graphics.setColor(0.6, 0.58, 0.52, 0.9)
    love.graphics.printf("TAB / ESC: Close Journal", mx, my + modalH - 26, modalW, "center")
end

return Journal
