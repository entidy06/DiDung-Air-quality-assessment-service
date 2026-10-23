import test from 'node:test';
import assert from 'node:assert/strict';
import { categoryFor, searchLocations, makeHistory, SCENARIOS } from '../dist/model.js';

test('US AQI boundaries classify exactly, including 0 and 500', () => {
  for (const [value, expected] of [[0,0],[50,0],[51,1],[100,1],[101,2],[150,2],[151,3],[200,3],[201,4],[300,4],[301,5],[500,5]]) {
    assert.equal(categoryFor(value)?.id, expected, `AQI ${value}`);
  }
});
test('missing, invalid and unsupported values never become good air', () => {
  for (const value of [null,undefined,NaN,-1,501,Infinity,'42','',50.5]) assert.equal(categoryFor(value), null);
});
test('Vietnamese search works with or without accents and rejects unknown locations', () => {
  assert.ok(searchLocations('ben thanh').some(p => p.name === 'Bến Thành'));
  assert.ok(searchLocations('THẢO ĐIỀN').some(p => p.name === 'Thảo Điền'));
  assert.equal(searchLocations('địa điểm không tồn tại').length,0);
  assert.equal(searchLocations('  ').length,5);
});
test('demo history has 24 bounded readings and ends at the selected scenario', () => {
  for (const scenario of SCENARIOS) {
    const history=makeHistory(scenario.value);
    assert.equal(history.length,24);
    assert.equal(history.at(-1).value,scenario.value);
    assert.equal(new Set(history.map(p=>p.time)).size,24);
    assert.ok(history.every(p=>p.value >= 0 && p.value <= 500 && categoryFor(p.value)));
  }
});
