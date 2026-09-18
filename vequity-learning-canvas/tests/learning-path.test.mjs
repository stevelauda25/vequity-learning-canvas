import test from 'node:test';
import assert from 'node:assert/strict';
import { lessons, checkedLessons } from '../lib/learning-path.ts';
import { chapters, cards, glossary } from '../lib/knowledge.ts';

test('Every canvas chapter has an ordered lesson with resolvable evidence and terms', () => {
  assert.deepEqual(lessons.map(lesson => lesson.id), chapters.map(chapter => chapter.id));
  for (const lesson of lessons) {
    assert.equal(new Set(lesson.quiz.options).size, lesson.quiz.options.length);
    assert.ok(lesson.quiz.options[lesson.quiz.correct]);
    for (const id of lesson.details) {
      const card = cards.find(card => card.id === id);
      assert.ok(card, `Missing detail ${id} in ${lesson.id}`);
      assert.ok(card.sources.length, `Missing source for ${id}`);
    }
    for (const term of lesson.terms) {
      assert.ok(glossary.some(([name]) => name === term), `Undefined term ${term}`);
    }
  }
});

test('Learning progress credits correct answers only, not visits or old review markers', () => {
  const correctAnswers = Object.fromEntries(lessons.map(lesson => [lesson.id, lesson.quiz.options[lesson.quiz.correct]]));
  assert.deepEqual(checkedLessons(correctAnswers), lessons.map(lesson => lesson.id));
  const first = lessons[0];
  const wrong = first.quiz.options.find((_, index) => index !== first.quiz.correct);
  assert.deepEqual(checkedLessons({ ...correctAnswers, [first.id]: wrong }), lessons.slice(1).map(lesson => lesson.id));
  for (const invalid of [null, [], lessons.map(lesson => lesson.id), 'overview', 8, { overview: true }, { overview: 1 }]) {
    assert.deepEqual(checkedLessons(invalid), []);
  }
});

test('Stale saved answers and unknown chapters cannot inflate completion', () => {
  assert.deepEqual(checkedLessons({ overview: 'An old answer from another revision', unknown: 'passed' }), []);
  const last = lessons.at(-1);
  assert.deepEqual(checkedLessons(JSON.parse(JSON.stringify({ [last.id]: last.quiz.options[last.quiz.correct] }))), [last.id]);
});
