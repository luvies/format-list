# Format List
![build status](https://travis-ci.com/luvies/format-list.svg?branch=master) [![Coverage Status](https://coveralls.io/repos/github/luvies/format-list/badge.svg?branch=master)](https://coveralls.io/github/luvies/format-list?branch=master) [![npm version](https://badge.fury.io/js/format-list.svg)](https://www.npmjs.com/package/format-list)

Formats a list of values into a given string using the `$n` tags. By default, index 0 will replace the `$1` tag, and it will go up by 1 from there. It can be configured with the following options:

- `tagStr`
  - The string to use as the tag prefix
- `tagStart`
  - The number to start the tags from
- `indexStart`
  - The index to start from
  - Allows regex results to be passed in without slicing (using a value of 1)

More info can be seen in the [code docs](src/index.ts).

## Examples
```ts
formatList('hello $1', ['world']) // -> 'hello world'

formatList('hello $1, it is an $2 day today', ['you', 'alright']) // -> 'hello you, it is an alright day today'

formatList('$2 $1', ['world', 'hello']) // -> 'hello world'

formatList('foo $0 bar', ['baz'], { tagStart: 0 }) // -> 'foo baz bar'

formatList('foo $1 bar', ['baz', 'faz'], { indexStart: 1 }) // -> 'foo faz bar'
```
