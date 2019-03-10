import { isNumeric, isEven, getPairLine, maybeConvertToInt, spacedStringToArray, stringToArray } from './helpers'

describe('helpers test', () => {
  it('test if a value is number', () => {
    expect(isNumeric(2)).toBe(true);
    expect(isNumeric(-2)).toBe(true);
    expect(isNumeric(1)).toBe(true);
    expect(isNumeric("1")).toBe(true);
    expect(isNumeric("a")).toBe(false);
    expect(isNumeric([])).toBe(false);
    expect(isNumeric({foo: 'bar'})).toBe(false);
  });

  it('test if number is even', () => {
    expect(isEven(2)).toBe(true);
    expect(isEven(-2)).toBe(true);
    expect(isEven(1)).toBe(false);
    expect(isEven("1")).toBe(false);
    expect(isEven("22")).toBe(true);
    expect(isEven("f")).toBe(false);
  })

  it('test pair', () => {
    expect(getPairLine(2)).toBe(1);
    expect(getPairLine(-2)).toBe(-3);
    expect(getPairLine(1)).toBe(0);
    expect(getPairLine("1")).toBe(0);
    expect(getPairLine("42")).toBe(41);
    expect(getPairLine("f")).toBeNull;
  })

  it('test number conversion to Int', () => {
    expect(['1', 'a'].map(maybeConvertToInt)).toEqual([1, 'a']);
    expect(['foo', 'bar'].map(maybeConvertToInt)).toEqual(['foo', 'bar']);
    expect(maybeConvertToInt('1gt')).toBe('1gt');
    expect(maybeConvertToInt('-100')).toBe(-100);
    expect(maybeConvertToInt('2.2')).toBe(2);
    expect(maybeConvertToInt(2.5)).toBe(2);
  })

  it('test string to array conversion', () => {
    expect(spacedStringToArray('1gt')).toEqual(['1gt']);
    expect(spacedStringToArray('-10 0')).toEqual([-10, 0]);
    expect(spacedStringToArray('-10 s0')).toEqual([-10, 's0']);
    expect(spacedStringToArray('2.2')).toEqual([2]);
    expect(() => spacedStringToArray(2.5)).toThrow();

    expect(stringToArray('1gt')).toEqual([1, 'g', 't']);
    expect(stringToArray('-10 0')).toEqual(['-', 1, 0, ' ', 0]);
    expect(stringToArray('-10 s0')).toEqual(['-', 1, 0, ' ', 's', 0]);
    expect(stringToArray('2.2')).toEqual([2, '.', 2]);
    expect(() => stringToArray(2.5)).toThrow();
  })
})