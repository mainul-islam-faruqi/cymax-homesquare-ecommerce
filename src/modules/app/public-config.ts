export const REVALIDATE_DEFAULT = process.env.REVALIDATE_DEFAULT
  ? parseInt(process.env.REVALIDATE_DEFAULT, 10)
  : 600 // 10 minutes
