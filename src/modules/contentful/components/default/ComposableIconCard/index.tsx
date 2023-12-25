import { Box } from '@chakra-ui/react'
import { getLinkTarget } from '@modules/app/utils'
import Link from 'next/link'
import React from 'react'
import { IconCard } from './IconCard'

export const ComposableIconCard: React.FC<any> = (props) => {
  const cta = props?.fields?.cta
  const { isExternal, href } = getLinkTarget(cta?.fields)

  return (
    <>
      {cta ? (
        <Link
          passHref
          href={href}
          id={cta?.sys?.id}
          target={isExternal ? '_blank' : '_self'}
        >
          <Box as="a" w="100%">
            <IconCard {...props} />
          </Box>
        </Link>
      ) : (
        <IconCard {...props} />
      )}
    </>
  )
}
