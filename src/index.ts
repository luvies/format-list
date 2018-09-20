import mappedReplace from 'mapped-replace';

/**
 * The spec of the options object used to configure custom starting points
 * for the list and `$n` tags.
 */
export interface Options {
  /**
   * The string that prefixes the tag.
   * @default '$'
   */
  tagStr?: string;
  /**
   * The number to start with for the $n tags.
   * @default 0 // i.e. $0
   */
  tagStart?: number;
  /**
   * The index to start with for the list replacement.
   * @default 0 // i.e. the value of index 0 is replaces the first tag.
   */
  indexStart?: number;
}

/**
 * Formats a list of values into a given string using the `$n` tags.
 * By default, index 0 will replace the `$0` tag, and it will go up
 * by 1 from there.
 *
 * @param str The string to format.
 * @param lst The list to get the values from.
 * @param opts The options for use for the formatting.
 * @returns The formatted string.
 */
export default function formatList(str: string, lst: string[], opts: Options = {}): string {
  opts.tagStr = typeof opts.tagStr === 'undefined' ? '$' : opts.tagStr;
  opts.tagStart = typeof opts.tagStart === 'undefined' ? 0 : opts.tagStart;
  opts.indexStart = typeof opts.indexStart === 'undefined' ? 0 : opts.indexStart;

  const rpl: Record<string, string> = {};
  for (let i = 0; i < lst.length - opts.indexStart; i++) {
    rpl[`${opts.tagStr}${i + opts.tagStart}`] = lst[i + opts.indexStart];
  }

  return mappedReplace(str, rpl);
}
