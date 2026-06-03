import { describe, expect, it } from 'vitest'

import { stripHtmlTags } from './stripHtmlTags'

describe('stripHtmlTags', () => {
  it('removes p tags from a single paragraph', () => {
    expect(stripHtmlTags('<p>An Act to provide for sample purposes.</p>')).toBe(
      'An Act to provide for sample purposes.',
    )
  })

  it('joins multiple paragraphs with a blank line', () => {
    expect(stripHtmlTags('<p>First paragraph.</p><p>Second paragraph.</p>')).toBe(
      'First paragraph.\n\nSecond paragraph.',
    )
  })
})
