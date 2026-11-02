export type TokenKind = 'keyword' | 'string' | 'literal' | 'punct' | 'text'
export type Token = { kind: TokenKind; text: string }

// Groups: 1 string, 2 keyword, 3 literal (number / boolean / null), 4 punctuation.
const TOKEN =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(const|let|var|function|return|export|import|from|new|type)\b|\b(true|false|null|undefined|\d+(?:\.\d+)?)\b|([{}[\]():;,.=])/g

/** Tiny single-line JS/TS tokenizer for decorative code snippets. */
export function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let last = 0
  for (const match of line.matchAll(TOKEN)) {
    if (match.index > last) tokens.push({ kind: 'text', text: line.slice(last, match.index) })
    const kind: TokenKind = match[1]
      ? 'string'
      : match[2]
        ? 'keyword'
        : match[3]
          ? 'literal'
          : 'punct'
    tokens.push({ kind, text: match[0] })
    last = match.index + match[0].length
  }
  if (last < line.length) tokens.push({ kind: 'text', text: line.slice(last) })
  return tokens
}
