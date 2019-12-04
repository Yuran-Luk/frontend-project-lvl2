import render from '../src/utils';

test('render', () => {
  const arr = [
    [' ', 'fuck', '22'],
    ['+', 'key', '12'],
    ['-', 'key', '54'],
    ['-', 'delete', '40'],
  ];
  expect(render(arr)).toBe(`{
    fuck: 22
  + key: 12
  - key: 54
  - delete: 40
}`);
});
