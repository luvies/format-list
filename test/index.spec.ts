import { expect } from 'chai';
import 'mocha';
import formatList from '../src';

describe('formatList', function() {
  it('should leave the string untouched when given an empty list', function() {
    expect(formatList('test string', [])).to.be.equal('test string');
    expect(formatList('foo bar', ['baz', 'faz'])).to.be.equal('foo bar');
    expect(formatList('', ['a', 'b'])).to.be.equal('');
  });

  it('should not change a string if the tags don\'t match up', function() {
    expect(formatList('foo $2 bar', ['faz'])).to.be.equal('foo $2 bar');
    expect(formatList('foo $1 bar', [])).to.be.equal('foo $1 bar');
    expect(formatList('foo $2 $3 bar', ['faz', 'baz'])).to.be.equal('foo baz $3 bar');
    expect(formatList('foo $5 bar', ['faz'])).to.be.equal('foo $5 bar');
  });

  it('should replace all tags that have a relevant list index', function() {
    expect(formatList('foo $1 baz', ['bar'])).to.be.equal('foo bar baz');
    expect(formatList('foo $2 baz', ['bar', 'faz'])).to.be.equal('foo faz baz');
    expect(formatList('foo $1 baz $2', ['bar', 'faz'])).to.be.equal('foo bar baz faz');
    expect(formatList('f$1o $2 b$3z', ['o', 'bar', 'a'])).to.be.equal('foo bar baz');
  });

  it('should properly handle index offset options', function() {
    expect(formatList('foo $1 bar', ['baz'], { indexStart: 1 })).to.be.equal('foo $1 bar');
    expect(formatList('foo $1 bar', ['baz'], { indexStart: 2 })).to.be.equal('foo $1 bar');
    expect(formatList('foo $1 bar', ['baz'], { indexStart: 3 })).to.be.equal('foo $1 bar');
    expect(formatList('foo $1 bar', ['baz'], { indexStart: 4 })).to.be.equal('foo $1 bar');
  });

  it('should properly handle tag offset options', function() {
    expect(formatList('foo $0 baz', ['bar'], { tagStart: 0 })).to.be.equal('foo bar baz');
    expect(formatList('foo $2 baz', ['bar'], { tagStart: 2 })).to.be.equal('foo bar baz');
    expect(formatList('foo $3 baz', ['bar'], { tagStart: 3 })).to.be.equal('foo bar baz');
    expect(formatList('foo $4 baz', ['bar'], { tagStart: 4 })).to.be.equal('foo bar baz');
  });

  it('should properly handle mixed tag and index offset options', function() {
    expect(formatList('foo $0 baz',
      [undefined, 'bar'] as any,
      { tagStart: 0, indexStart: 1 })).to.be.equal('foo bar baz');
    expect(formatList('foo $3 baz',
      [undefined, 'faz', 'bar', 'baz'] as any,
      { tagStart: 3, indexStart: 2 })).to.be.equal('foo bar baz');
    expect(formatList('foo $2 baz',
      [undefined, undefined, undefined, 'bar'] as any,
      { tagStart: 2, indexStart: 3 })).to.be.equal('foo bar baz');
    expect(formatList('foo $4 baz',
      ['bar'],
      { tagStart: 4, indexStart: 4 })).to.be.equal('foo $4 baz');
    expect(formatList('foo $4 baz',
      ['bar'],
      { tagStart: 5, indexStart: 4 })).to.be.equal('foo $4 baz');
    expect(formatList('foo $2 baz',
      [undefined, undefined, undefined, undefined, undefined, 'bar'] as any,
      { tagStart: 1, indexStart: 4 })).to.be.equal('foo bar baz');
    expect(formatList('foo $6 baz',
      [undefined, undefined, undefined, 'bar'] as any,
      { tagStart: 4, indexStart: 1 })).to.be.equal('foo bar baz');
  });

  it('should handle custom tag prefixes', function() {
    expect(formatList('foo &1 baz', ['bar'], { tagStr: '&' })).to.be.equal('foo bar baz');
    expect(formatList('foo $1 baz', ['bar'], { tagStr: '&' })).to.be.equal('foo $1 baz');
    expect(formatList('foo ^1 baz', ['bar'], { tagStr: '^' })).to.be.equal('foo bar baz');
    expect(formatList('foo £1 baz', ['bar'], { tagStr: '£' })).to.be.equal('foo bar baz');
  });

  it('should work for regex results', function() {
    let match: RegExpMatchArray = 'foo bar baz'.match(/(b..) (b..)/)!
    expect(formatList('group 1: $1, group 2: $2', match, { indexStart: 1 }))
      .to.be.equal('group 1: bar, group 2: baz')
    match = 'foo bar baz'.match(/(b..)+/g)!
    expect(formatList('group 1: $1, group 2: $2', match))
      .to.be.equal('group 1: bar, group 2: baz')
  });
});
