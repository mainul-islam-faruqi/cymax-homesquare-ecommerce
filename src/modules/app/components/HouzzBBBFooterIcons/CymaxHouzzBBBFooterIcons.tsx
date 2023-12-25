import { Link } from '@chakra-ui/react'
import { BBB_URL } from '@modules/app/constants'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'
import { ChakraNextImage } from '../ChakraNextImage'

export const CymaxHouzzBBBFooterIcons = () => {
  const intl = useIntl()

  return (
    <NextLink
      passHref
      href={BBB_URL as string}
      aria-label={intl.formatMessage({
        id: 'ariaLabel.BBB',
      })}
    >
      <Link target="_blank">
        <ChakraNextImage
          marginLeft={-1}
          src={'/img/bbb-footer-icon.png'}
          alt={intl.formatMessage({
            id: 'altTag.BBBIcon',
          })}
          objectFit="cover"
          width={140}
          height={52}
        />
      </Link>
    </NextLink>
  )
}
