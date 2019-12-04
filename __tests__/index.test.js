import parse from '../src/index';

test('parsing', () => {
  const before = {
    one: 'google',
    two: 'yahoo',
    three: 'mail',
  };

  const after = {
    one: 'yandex',
    two: 'yahoo',
    four: 'rambler',
  };

  expect(parse(before, after)).toEqual([
    [' ', 'two', 'yahoo'],
    ['-', 'one', 'google'],
    ['+', 'one', 'yandex'],
    ['+', 'four', 'rambler'],
    ['-', 'three', 'mail'],
  ]);
});
