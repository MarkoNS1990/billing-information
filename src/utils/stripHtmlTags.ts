/** Removes HTML markup from API text fields (e.g. long titles wrapped in `<p>`). */
export function stripHtmlTags(value: string): string {
  return value
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<\/?p>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .trim()
}
