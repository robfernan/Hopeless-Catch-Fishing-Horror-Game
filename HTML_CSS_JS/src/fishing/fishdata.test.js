// fishdata.test.js - Tests for fish data functions
// Run with: node fishdata.test.js

// Load the fishdata module
let FishData;
try {
  FishData = require('./fishdata.js');
} catch (e) {
  console.error('Failed to load fishdata.js:', e.message);
  process.exit(1);
}

if (!FishData) {
  console.error('FishData module is not defined');
  process.exit(1);
}

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    testsFailed++;
  } else {
    console.log(`✓ PASSED: ${message}`);
    testsPassed++;
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    console.error(`❌ FAILED: ${message} (expected ${expected}, got ${actual})`);
    testsFailed++;
  } else {
    console.log(`✓ PASSED: ${message}`);
    testsPassed++;
  }
}

// Test Suite: getDayFish() and getNightFish()
console.log('\n=== Testing getDayFish() and getNightFish() ===\n');

// Test 1: getDayFish returns only day fish
const dayFish = FishData.getDayFish();
assert(dayFish.length > 0, 'getDayFish() returns non-empty array');
assert(dayFish.every(f => !f.isNightOnly), 'All fish from getDayFish() have isNightOnly === false');
assertEqual(dayFish.length, 5, 'getDayFish() returns exactly 5 day fish');

// Test 2: getNightFish returns only night fish
const nightFish = FishData.getNightFish();
assert(nightFish.length > 0, 'getNightFish() returns non-empty array');
assert(nightFish.every(f => f.isNightOnly), 'All fish from getNightFish() have isNightOnly === true');
assertEqual(nightFish.length, 4, 'getNightFish() returns exactly 4 night fish');

// Test 3: Day and night fish are mutually exclusive
const dayIds = new Set(dayFish.map(f => f.id));
const nightIds = new Set(nightFish.map(f => f.id));
const intersection = [...dayIds].filter(id => nightIds.has(id));
assertEqual(intersection.length, 0, 'Day and night fish have no overlap');

// Test 4: Combined day and night fish equals all fish
const allFish = FishData.getAllFish();
assertEqual(dayFish.length + nightFish.length, allFish.length, 'Day fish + night fish = all fish');

// Test 5: Verify specific fish are in correct categories
const sunfish = dayFish.find(f => f.id === 'sunfish');
assert(sunfish !== undefined, 'Sunfish is in day fish');

const fishman = nightFish.find(f => f.id === 'fishman');
assert(fishman !== undefined, 'Fishman is in night fish');

// Test 6: Verify horror fish are all night fish
const horrorFish = allFish.filter(f => f.isHorror);
assert(horrorFish.every(f => f.isNightOnly), 'All horror fish are night only');

// Test 7: Verify day fish have no horror fish
assert(!dayFish.some(f => f.isHorror), 'No horror fish in day fish');

// Test 8: Verify night fish include horror fish
assert(nightFish.some(f => f.isHorror), 'Night fish includes horror fish');

// Summary
console.log(`\n=== Test Summary ===`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log(`Total: ${testsPassed + testsFailed}\n`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('✓ All tests passed!');
  process.exit(0);
}
