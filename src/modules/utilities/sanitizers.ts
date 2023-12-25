export function sanitizeElasticPathId(id: string): string | null {
  const regexValidationId = id.match(
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  )
  const sanitizedId = regexValidationId?.[0] ?? null
  return sanitizedId
}
