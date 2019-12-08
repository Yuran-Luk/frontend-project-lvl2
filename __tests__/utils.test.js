import render from '../src/utils';

test('render', () => {
  const arr = [
    [' ', 'non', '22'],
    ['+', 'key', '12'],
    ['-', 'key', '54'],
    ['-', 'delete', '40'],
  ];
  expect(render(arr)).toBe(`{
    non: 22
  + key: 12
  - key: 54
  - delete: 40
}`);
});
