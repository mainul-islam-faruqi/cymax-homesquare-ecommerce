module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn ts --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn lint ${filenames.join(' ')}`,
    `yarn format ${filenames.join(' ')}`,
  ],
}
