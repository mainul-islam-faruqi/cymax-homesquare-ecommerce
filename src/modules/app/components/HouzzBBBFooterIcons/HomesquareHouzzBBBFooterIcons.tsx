import { Flex, Link } from '@chakra-ui/react'
import { HOUZZ_URL } from '@modules/app'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'
import { ChakraNextImage } from '../ChakraNextImage'

export const HomesquareHouzzBBBFooterIcons = () => {
  const intl = useIntl()

  return (
    <Flex gap={5}>
      <NextLink
        passHref
        href={(HOUZZ_URL as string) ?? '#'}
        aria-label={intl.formatMessage({
          id: 'ariaLabel.HouzzOneIcon',
        })}
      >
        <Link target="_blank">
          <ChakraNextImage
            src={'/img/houzz-footer-icon-1.png'}
            alt={intl.formatMessage({
              id: 'altTag.HouzzOneIcon',
            })}
            objectFit="cover"
            width={60}
            height={60}
          />
        </Link>
      </NextLink>
      <NextLink
        passHref
        href={(HOUZZ_URL as string) ?? '#'}
        aria-label={intl.formatMessage({
          id: 'ariaLabel.HouzzTwoIcon',
        })}
      >
        <Link target="_blank">
          <ChakraNextImage
            src={'/img/houzz-footer-icon-2.png'}
            alt={intl.formatMessage({
              id: 'altTag.HouzzTwoIcon',
            })}
            objectFit="cover"
            width={60}
            height={60}
          />
        </Link>
      </NextLink>
    </Flex>
  )
}
