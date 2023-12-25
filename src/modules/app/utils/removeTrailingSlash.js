const removeTrailingSlash = (str) => {
  if (!str) {
    return ''
  }

  const lastCharacter = str[str.length - 1]

  return lastCharacter.includes('/') ? str.slice(0, -1) : str
}

module.exports = { removeTrailingSlash }
