import { Button, Text, useBreakpointValue } from '@chakra-ui/react'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { getButtonVariant, getLinkTarget } from '@modules/app/utils'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { ThemeVariant } from '@modules/contentful/utils/types'
import { clickEvent } from '@modules/gtm/clickEvent'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { CTAText, LinkVariant } from './types'
import { variantsDark } from './variant'

export const CallToAction = (link: ContentfulCTA) => {
  const router = useRouter()
  const currentRoute = router.asPath
  const { isExternal, href } = getLinkTarget(link)
  const variant = getButtonVariant(link)
  const buttonSize = useBreakpointValue(['sm', 'md', 'lg', 'xl'])
  const buttonWidth = { base: '100%', xs: '100%', sm: '100%', md: 'auto' }
  const { token: csaToken } = useCsa()

  const handleButtonClick = useCallback(() => {
    const clickText = link
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: clickText.url || '',
      section: clickText.label || '',
      clicktext: clickText.label || '',
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }, [])
  return (
    <Link href={href === '' ? currentRoute : href} passHref id={link?.name}>
      <Button
        onClick={handleButtonClick}
        as="a"
        target={isExternal ? '_blank' : '_self'}
        size={buttonSize}
        variant={variant}
        width={link?.variant !== LinkVariant.Link ? buttonWidth : {}}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        sx={link?.theme === ThemeVariant.Dark ? variantsDark[variant] : {}}
        fontSize={{
          xs: 'desktop.bodySM',
          sm: 'desktop.bodySM',
          md: 'desktop.bodySM',
          lg: 'desktop.body',
        }}
        {...link?.buttonChakraProps}
      >
        {ctaText(link)}
      </Button>
    </Link>
  )
}

const ctaText = ({ textOverflowEllipsis, label }: CTAText) => {
  return (
    <>
      {textOverflowEllipsis ? (
        <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {label}
        </Text>
      ) : (
        label
      )}
    </>
  )
}
