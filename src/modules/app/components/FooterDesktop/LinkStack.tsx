import { Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { getLinkTarget } from '@modules/app/utils'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import { clickEvent } from '@modules/gtm/clickEvent'
import { useMegaMenu } from '@myplanetdigital/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useIntl } from 'react-intl'
import { LinkItem, LinkStackProps } from '../FooterMobile/types'

export const LinkStack = ({ item, level }: LinkStackProps) => {
  const { token: csaToken } = useCsa()
  const intl = useIntl()
  const router = useRouter()
  const id = item?.sys?.id ?? ''
  const { isExternal, href } = getLinkTarget(item?.link)
  const label = item?.link?.label ?? ''
  const { children, hasChildren } = useContentfulMegaMenuItem(id)
  const { linkProps } = useMegaMenu({
    item: {
      href,
      hasChildren,
    },
    routerPush: router.push,
  })

  const paddingLeft = level > 2 ? 0 : 10
  // CTA link component inside the MegaMenuItem does not have any href passed inside
  const renderCtaWithoutLink = !hasChildren && href === ''

  const handleLinkClick = () => {
    console.log('item', item)
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: item?.link?.linkToEntry?.slug || '',
      section: intl.formatMessage({ id: 'ariaLabel.footerSection' }),
      clicktext: label,
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }

  return (
    <Stack
      spacing="1"
      minW={{ lg: '40' }}
      paddingLeft={{ base: paddingLeft, md: 0, lg: paddingLeft }}
    >
      {hasChildren ? (
        <>
          <Text
            fontSize={level > 1 ? 'md' : 'lg'}
            fontWeight="bold"
            color="shading.900"
            paddingBottom={'16px'}
            paddingLeft={{
              base: level > 1 ? 0 : paddingLeft,
              md: 0,
              lg: level > 1 ? 0 : paddingLeft,
            }}
            marginTop={level > 1 ? 6 : 0}
          >
            {label}
          </Text>
          {React.Children.toArray(
            children?.map((item: any) => (
              // eslint-disable-next-line react/jsx-key
              <LinkStack item={item as LinkItem} level={level + 1} />
            ))
          )}
        </>
      ) : renderCtaWithoutLink ? (
        <>{label}</>
      ) : (
        <Link href={href} passHref>
          <ChakraLink
            display="block"
            color="shading.900"
            fontSize="sm"
            {...linkProps}
            isExternal={isExternal}
            padding={0}
            onClick={handleLinkClick}
          >
            {label}
          </ChakraLink>
        </Link>
      )}
    </Stack>
  )
}
