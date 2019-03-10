import {
  directionValidated,
  cmdsValidated,
  orientationValidated,
  lawnValidated,
  hasValidatedLawn,
  mowerValidated,
  hasAssociatedMower
} from './validations';

describe('validations test', () => {
  it('validate direction', () => {
    expect(directionValidated('R')).toBe(true)
    expect(directionValidated('d')).toBe(false)
  })

  it('validate commands', () => {
    expect(cmdsValidated('F')).toBe(true)
    expect(cmdsValidated('f')).toBe(false)
  })

  it('validate orientations', () => {
    expect(orientationValidated("E")).toBe(true)
    expect(orientationValidated("G")).toBe(false)
  })

  it('validate lawn initialization', () => {
    expect(lawnValidated([4,3])).toBe(true)
    expect(lawnValidated([2])).toBe(false)
    expect(lawnValidated("f")).toBe(false)
    expect(lawnValidated(['f', 2])).toBe(false)
  })

  it('verify lawn before mower init', () => {
    const data = {
      lawn: {
        endPoint: [3, 4]
      }
    }
    expect(hasValidatedLawn(data)).toBe(true)

    const corruptedData = {
      lawn: {
        startPoint: [0, 0]
      }
    }
    expect(hasValidatedLawn(corruptedData)).toBe(false)
  })

  it('validate mower initialization', () => {
    const lawn = { endPoint: [5,5] }
    expect(mowerValidated([2,3,"E"], { lawn } )).toBe(true)
    expect(mowerValidated([7,3,"E"], { lawn } )).toBe(false)
    expect(mowerValidated([2,3,"D"], { lawn } )).toBe(false)
    expect(mowerValidated([2,3,"D"], { lawn: {} } )).toBe(false)
    expect(mowerValidated(['g',3,"N"], { lawn } )).toBe(false)
  })

  it('validate commands has corresponding mower initialized', () => {
    expect(hasAssociatedMower(2, { mower: { key: 2, initPos: [] } })).toBe(true)
    expect(hasAssociatedMower(2, { mower: { key: 2 } })).toBe(false)
  })
})
