/* eslint-disable consistent-return */
import { NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app/constants'
import { ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Perform a server side redirect
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
const serverSideRedirect = (
  res: ServerResponse,
  destinationPath: string,
  statusCode = 301
) => {
  res.writeHead(statusCode, { Location: destinationPath })
}

const previewComponent = (req: NextApiRequest, res: NextApiResponse) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  if (req.query.site !== NEXT_PUBLIC_SITE_IDENTIFIER) {
    return res.status(401).json({ message: 'Invalid site' })
  }
  if (!/^[\/a-zA-Z0-9-.]+$/.test(req.query.slug as string)) {
    return res.status(401).json({ message: 'invalid slug' })
  }
  // Calling setPreviewData sets a preview cookies that turn on the preview mode.
  // Any requests to Next.js containing these cookies will be seen as preview mode,
  // and the behavior for statically generated pages will change.
  res.setPreviewData({
    maxAge: 60 * 60, // The preview mode cookies expire in 1 hour
  })
  const { pageId } = req.query || {}
  let destinationPath = ''
  switch (pageId) {
    case 'genericPageWithMenu':
    case 'plp':
      destinationPath = `/${req.query.slug}`
      break
    case 'genericPage':
      destinationPath =
        req.query.slug !== 'homepage' ? `/${req.query.slug}` : `/`
      break
    default:
      break
  }
  serverSideRedirect(res, destinationPath, 307)
  res.end()
}

export default previewComponent
