import React from 'react'
import Image from 'next/image'
import { DEFAULT_SITE, NEXT_PUBLIC_SITE_IDENTIFIER } from '@modules/app'
import { Box } from '@chakra-ui/react'
import { useBreakpointValue } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export interface LogoProps {
  height: number
}

const GetUrlAndAR = () => {
  switch (NEXT_PUBLIC_SITE_IDENTIFIER || DEFAULT_SITE) {
    case 'homesquare':
      return {
        url: '/img/homesquare.svg',
        AR: 164 / 28,
        maxH: 7,
      }
    case 'cymax':
    default:
      return {
        url: '/img/cymax.svg',
        AR: 164 / 47,
        maxH: 7,
      }
  }
}

export const Logo: React.FC<LogoProps> = ({ height }) => {
  const intl = useIntl()
  const data = GetUrlAndAR()
  const isMobile = useBreakpointValue({ base: true, md: false })
  return (
    <Box
      maxH={data.maxH}
      height={height}
      width={isMobile ? '117px' : data.AR * height}
      position="relative"
    >
      <Image
        src={data.url}
        layout="fill"
        objectFit="contain"
        objectPosition={!isMobile ? 'left' : 'center'}
        alt={`${NEXT_PUBLIC_SITE_IDENTIFIER} ${intl.formatMessage({
          id: 'ariaLabel.logo',
        })}`}
      />
    </Box>
  )
}
