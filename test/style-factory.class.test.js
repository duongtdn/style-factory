"use strict"

import StyleFactory from '../src';

test('Test create style using string for special words {error} {warning} {info}', () => {
  const factory = new StyleFactory();
  factory
  .useStyle('error', { color: 'red' })
  .useStyle('warning', { color: 'yellow' })
  .useStyle('info', { color: 'blue' });

  const str = 'Test error code and info code plus warning code in a specialerror with strangewarninginfo';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test ' },
    { text: 'error', style: { color: 'red' } },
    { text: ' code and ' },
    { text: 'info', style: { color: 'blue' } },
    { text: ' code plus ' },
    { text: 'warning', style: { color: 'yellow' } },
    { text: ' code in a special' },
    { text: 'error', style: { color: 'red' } },
    { text: ' with strange' },
    { text: 'warning', style: { color: 'yellow' } },
    { text: 'info', style: { color: 'blue' } },
  ]);

});

test('Test create style using regex for special words {error} {warning} {info}', () => {
  const factory = new StyleFactory();
  factory
  .useStyle(/\serror\s/, { color: 'red' })
  .useStyle(/\swarning\s/, { color: 'yellow' })
  .useStyle(/\sinfo\s/, { color: 'blue' });

  const str = 'Test error code and info code plus warning code in a specialerror with strangewarninginfo';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test' },
    { text: ' error ', style: { color: 'red' } },
    { text: 'code and' },
    { text: ' info ', style: { color: 'blue' } },
    { text: 'code plus' },
    { text: ' warning ', style: { color: 'yellow' } },
    { text: 'code in a specialerror with strangewarninginfo' },
  ]);

});

test('Test clean up using string', () => {
  const factory = new StyleFactory();
  factory
  .useStyle(/(?:\[\w+\])?\[b\][^,\[]*\[\/b\](?:\[\/\w+\])?/, { fontWeight: 'bold' })
  .useStyle(/(?:\[\w+\])?\[i\][^,\[]*\[\/i\](?:\[\/\w+\])?/, { fontStyle: 'italic' })
  .useStyle(/(?:\[\w+\])?\[u\][^,\[]*\[\/u\](?:\[\/\w+\])?/, { textDecoration: 'underline' })
  .useCleaner('\\[\\/?\\w+\\]');

  const str = 'Test if [u]these pattern[/u] are [i]parsed[/i] and [b]cleaned up[/b].';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test if ' },
    { text: 'these pattern', style: { textDecoration: 'underline' } },
    { text: ' are ' },
    { text: 'parsed', style: { fontStyle: 'italic' } },
    { text: ' and ' },
    { text: 'cleaned up', style: { fontWeight: 'bold' } },
    { text: '.' },
  ]);

});

test('Test clean up using pattern', () => {
  const factory = new StyleFactory();
  factory
  .useStyle(/(?:\[\w+\])?\[b\][^,\[]*\[\/b\](?:\[\/\w+\])?/, { fontWeight: 'bold' })
  .useStyle(/(?:\[\w+\])?\[i\][^,\[]*\[\/i\](?:\[\/\w+\])?/, { fontStyle: 'italic' })
  .useStyle(/(?:\[\w+\])?\[u\][^,\[]*\[\/u\](?:\[\/\w+\])?/, { textDecoration: 'underline' })
  .useCleaner(/\[\/?\w+\]/);

  const str = 'Test if [u]these pattern[/u] are [i]parsed[/i] and [b]cleaned up[/b].';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test if ' },
    { text: 'these pattern', style: { textDecoration: 'underline' } },
    { text: ' are ' },
    { text: 'parsed', style: { fontStyle: 'italic' } },
    { text: ' and ' },
    { text: 'cleaned up', style: { fontWeight: 'bold' } },
    { text: '.' },
  ]);

});

test('Test create cascaded style (1)', () => {
  const factory = new StyleFactory();
  factory
  .useStyle(/\[b\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/b\]/, { fontWeight: 'bold' })
  .useStyle(/\[i\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/i\]/, { fontStyle: 'italic' })
  .useStyle(/\[u\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/u\]/, { textDecoration: 'underline' })
  .useStyle(/\[blue\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/blue\]/, { color: 'blue' })
  .useCleaner(/\[\/?\w+\]/);

  const str = 'Test if [blue][u]these pattern[/u][/blue]   are [i][blue]parsed[/blue][/i] and [b]cleaned up[/b].';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test if ' },
    { text: 'these pattern', style: { textDecoration: 'underline', color: 'blue' } },
    { text: '   are ' },
    { text: 'parsed', style: { fontStyle: 'italic', color: 'blue' } },
    { text: ' and ' },
    { text: 'cleaned up', style: { fontWeight: 'bold' } },
    { text: '.' },
  ]);

});

test('Test create cascaded style (2)', () => {
  const factory = new StyleFactory();
  factory
  .useStyle(/\[b\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/b\]/, { fontWeight: 'bold' })
  .useStyle(/\[i\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/i\]/, { fontStyle: 'italic' })
  .useStyle(/\[u\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/u\]/, { textDecoration: 'underline' })
  .useStyle(/\[blue\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/blue\]/, { color: 'blue' })
  .useCleaner(/\[\/?\w+\]/);

  const str = '[blue][u]Test if these pattern[/u][/blue] are [i][blue]parsed[/blue][/i] and [b]cleaned up[/b]';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test if these pattern', style: { textDecoration: 'underline', color: 'blue' } },
    { text: ' are ' },
    { text: 'parsed', style: { fontStyle: 'italic', color: 'blue' } },
    { text: ' and ' },
    { text: 'cleaned up', style: { fontWeight: 'bold' } },
  ]);

});

test('Test create cascaded style (3)', () => {
  const factory = new StyleFactory();
  factory
  .useStyle(/\[b\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/b\]/, { fontWeight: 'bold' })
  .useStyle(/\[i\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/i\]/, { fontStyle: 'italic' })
  .useStyle(/\[u\](?:\[\w+\])?[^,\[]*(?:\[\/\w+\])?\[\/u\]/, { textDecoration: 'underline' })
  .useCleaner(/\[\/?\w+\]/);

  const str = 'Test [b]bold and [/b][b][i]italic[/i][/b] and [b][u]underline[/u][/b][b] with bold[/b]';
  expect(
    factory.create(str)
  ).toEqual([
    { text: 'Test ' },
    { text: 'bold and ', style: { fontWeight: 'bold' } },
    { text: 'italic', style: { fontWeight: 'bold', fontStyle: 'italic' } },
    { text: ' and ' },
    { text: 'underline', style: { fontWeight: 'bold', textDecoration: 'underline' } },
    { text: ' with bold', style: { fontWeight: 'bold' } },
  ]);

});