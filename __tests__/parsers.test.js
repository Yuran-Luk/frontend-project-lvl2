import parse from '../src/parsers';

test('parsing', () => {
  const before = {
    zero: 'zero',
    one: 'google',
    two: 'yahoo',
  };

  const after = {
    one: 'yandex',
    two: 'yahoo',
    three: 'yahoo',
  };

  expect(parse(before, after)).toEqual([
    [' ', 'two', 'yahoo'],
    ['-', 'one', 'google'],
    ['+', 'one', 'yandex'],
    ['+', 'three', 'yahoo'],
    ['-', 'zero', 'zero'],
  ]);
});
