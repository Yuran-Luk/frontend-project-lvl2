import diff from '../src';

test('diff', () => {
  const before = {
    a: '1',
    b: '2',
    c: '3',
  };
  const after = {
    a: '1',
    b: '2',
    d: '4',
  };
  expect(diff(before, after)).toBe('+ d: 4\n- c: 3');
});

test('differ', () => {
  const before = {
    a: '1',
    b: '2',
    c: '3',
  };
  const after = {
    a: '3',
    b: '2',
    d: '4',
  };
  expect(diff(before, after)).toBe('- a: 1\n+ a: 3\n+ d: 4\n- c: 3');
});
