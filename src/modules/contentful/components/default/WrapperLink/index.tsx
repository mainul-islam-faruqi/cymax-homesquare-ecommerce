import { Link } from '@chakra-ui/react'
import { getLinkTarget } from '@modules/app/utils'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import NextLink from 'next/link'

interface WrapperLinkProps {
  link: ContentfulCTA
  children: JSX.Element
  width?: string
}

export const WrapperLink = ({link, children, width}: WrapperLinkProps) => {
  const { isExternal, href } = getLinkTarget(link)

  return (
    <NextLink href={href} passHref id={link?.name} >
      <Link
        target={isExternal ? '_blank' : '_self'}
        width={width}
        display='contents'
      >
        {children}
        </Link>
    </NextLink>
  )
}
