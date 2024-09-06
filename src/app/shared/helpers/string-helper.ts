export class StringHelper {

  /**
   * Sanitizes a given string by:
   * - Removing double quotes.
   * - Replacing multiple spaces with a single space.
   * - Trimming leading and trailing spaces.
   *
   * @param input - The string to sanitize.
   * @returns The sanitized string.
   */
  static sanitizeString(input: string): string {
    // Remove double quotes
    let sanitized = input.replace(/"/g, '');

    // Replace multiple spaces with a single space and trim
    sanitized = sanitized.replace(/\s+/g, ' ').trim();

    return sanitized;
  }
}
