import { describe, expect, it } from 'vitest'
import { normalizeAddress } from '@/lib/game/address'

describe('normalizeAddress', () => {
  it('should normalize address correctly', () => {
    expect(normalizeAddress('Asda (AB-123a)')).toBe('AB-123a')
    expect(normalizeAddress('AB-123a')).toBe('AB-123a')
    expect(normalizeAddress('AB-123A')).toBe('AB-123a')
    expect(normalizeAddress('AB-123a')).toBe('AB-123a')
  })

  it('should return undefined for invalid address', () => {
    expect(normalizeAddress('InvalidAddress')).toBeUndefined()
    expect(normalizeAddress('A-123a')).toBeUndefined()
    expect(normalizeAddress('AB-12a')).toBeUndefined()
    expect(normalizeAddress('AB-1234a')).toBeUndefined()
    expect(normalizeAddress('ab-123a')).toBeUndefined()
  })
})
