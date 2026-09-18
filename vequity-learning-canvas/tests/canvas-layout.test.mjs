import test from 'node:test';
import assert from 'node:assert/strict';
import { chapters } from '../lib/knowledge.ts';
import {
  arrangeChapters,
  canvasBounds,
  chapterConnections,
} from '../lib/canvas-layout.ts';

// Test the geometry of each line segment, independently of how routes are chosen.
function segments(path) {
  const commands = [...path.matchAll(/([MHV])(-?[\d.]+)(?: (-?[\d.]+))?/g)];
  let point;
  const result = [];
  for (const [, command, a, b] of commands) {
    const next =
      command === 'M'
        ? { x: +a, y: +b }
        : command === 'H'
          ? { x: +a, y: point.y }
          : { x: point.x, y: +a };
    if (point) result.push([point, next]);
    point = next;
  }
  return result;
}
function crosses([a, b], box) {
  if (a.x === b.x)
    return (
      a.x > box.x &&
      a.x < box.x + box.w &&
      Math.max(a.y, b.y) > box.y &&
      Math.min(a.y, b.y) < box.y + box.h
    );
  return (
    a.y > box.y &&
    a.y < box.y + box.h &&
    Math.max(a.x, b.x) > box.x &&
    Math.min(a.x, b.x) < box.x + box.w
  );
}

test('Canvas connections stay outside chapter content, including expanded callouts', () => {
  for (const heights of [
    {},
    { overview: 1480, people: 980, rules: 1650, scope: 1400 },
  ]) {
    const layout = arrangeChapters(chapters, heights);
    const links = chapterConnections(layout);
    assert.equal(links.length, chapters.length - 1);
    for (const link of links)
      for (const segment of segments(link.path)) {
        for (const chapter of layout) {
          assert.equal(
            crosses(segment, chapter),
            false,
            `${link.id} crosses ${chapter.id}`,
          );
        }
      }
  }
});

test('Expanded chapters remain separated and included in fit-all and minimap bounds', () => {
  const original = structuredClone(chapters);
  const heights = { overview: 1550, report: 1210, states: 1450, scope: 1800 };
  const layout = arrangeChapters(chapters, heights);
  const bounds = canvasBounds(layout);
  assert.deepEqual(chapters, original, 'Layout must not mutate source content');
  for (const chapter of layout) {
    assert.ok(chapter.h >= (heights[chapter.id] ?? 0));
    assert.ok(chapter.x >= bounds.x && chapter.y >= bounds.y);
    assert.ok(chapter.x + chapter.w <= bounds.x + bounds.w);
    assert.ok(chapter.y + chapter.h <= bounds.y + bounds.h);
  }
  for (let index = 2; index < layout.length; index += 2) {
    const previous = layout.slice(index - 2, index);
    assert.ok(
      layout[index].y >
        Math.max(...previous.map((chapter) => chapter.y + chapter.h)),
    );
    assert.equal(layout[index].y, layout[index + 1].y);
  }
});
