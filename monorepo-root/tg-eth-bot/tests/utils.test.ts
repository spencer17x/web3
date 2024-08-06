import { expect, test } from 'vitest';

import { diffPercent, formatNumbro } from '../src/utils';

test('test formatNumbro', () => {
	expect(formatNumbro(0.0000484)).toBe('0.{4}48');
	expect(formatNumbro(0.00000487)).toBe('0.{5}48');
	expect(formatNumbro(0.487)).toBe('0.48');
	expect(formatNumbro(0.48722)).toBe('0.48');
	expect(formatNumbro(0)).toBe('0');
	expect(formatNumbro(1)).toBe('1');
	expect(formatNumbro(1000)).toBe('1K');
	expect(formatNumbro('100,000,100')).toBe('100M');
});

test('test diffPercent', () => {
	expect(diffPercent(0.00001933725221598384, 0.00002042298610290201)).toBe('-5.32%');
});