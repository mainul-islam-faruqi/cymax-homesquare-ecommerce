import NextLink from 'next/link'
import { useComposable } from '@myplanetdigital/base'
import {
  FaTwitter,
  FaInstagramSquare,
  FaYoutube,
  FaPinterest,
  FaFacebook,
  FaHouzz,
} from 'react-icons/fa'
import { ButtonGroup, IconButton } from '@chakra-ui/react'
import {
  NEXT_PUBLIC_SOCIAL_FACEBOOK_URL,
  NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL,
  NEXT_PUBLIC_SOCIAL_PINTEREST_URL,
  NEXT_PUBLIC_SOCIAL_TWITTER_URL,
  NEXT_PUBLIC_SOCIAL_YOUTUBE_URL,
  NEXT_PUBLIC_SOCIAL_HOUZZ_URL,
} from '@modules/app/constants'
import { IconType } from 'react-icons'

interface SocialIconDataType {
  [key: string]: {
    name: string
    url: string
    icon: IconType
  }
}

const SocialIconData: SocialIconDataType = {
  Pinterest: {
    name: 'Pinterest',
    url: NEXT_PUBLIC_SOCIAL_PINTEREST_URL || '#',
    icon: FaPinterest,
  },
  Facebook: {
    name: 'Facebook',
    url: NEXT_PUBLIC_SOCIAL_FACEBOOK_URL || '#',
    icon: FaFacebook,
  },
  Instagram: {
    name: 'Instagram',
    url: NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL || '#',
    icon: FaInstagramSquare,
  },
  Youtube: {
    name: 'Youtube',
    url: NEXT_PUBLIC_SOCIAL_YOUTUBE_URL || '#',
    icon: FaYoutube,
  },
  Twitter: {
    name: 'Twitter',
    url: NEXT_PUBLIC_SOCIAL_TWITTER_URL || '#',
    icon: FaTwitter,
  },
  Houzz: {
    name: 'Houzz',
    url: NEXT_PUBLIC_SOCIAL_HOUZZ_URL || '#',
    icon: FaHouzz,
  },
}

export const SocialIcons = ({ socialIcons }: { socialIcons?: string[] }) => {
  return (
    <ButtonGroup variant="ghost" gap={'12px'}>
      {socialIcons?.map((socialIcon) => {
        const social = SocialIconData[socialIcon]
        const IconComponent = SocialIconData[socialIcon].icon
        return social ? (
          <IconButton
            key={social.name}
            as="a"
            marginInlineStart={'0px !important'}
            borderRadius="100%"
            height={'40px'}
            width={'40px'}
            href={social.url}
            aria-label={social.name}
            icon={<IconComponent fontSize="1.35rem" />}
          />
        ) : null
      })}
    </ButtonGroup>
  )
}
