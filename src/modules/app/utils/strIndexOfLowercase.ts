export function strIndexOfLowercase(source: string, query: string): number {
  if (source != null && query != null) {
    return source.toLowerCase().indexOf(query.toLowerCase())
  }
  return -1
}
