/* eslint-disable react/jsx-key */
import {
  Box,
  Container,
  Link as ChakraLink,
  LinkProps,
  List,
  ListItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'

import { getLinkTarget } from '@modules/app/utils'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { Maybe, MegaMenuItemFragment } from '@modules/contentful/utils'
import { clickEvent } from '@modules/gtm/clickEvent'
import React, { useCallback } from 'react'
import { useIntl } from 'react-intl'

export const MegaMenuContentColumns = (props: {
  data?: Maybe<MegaMenuItemFragment>[]
  linkProps: LinkProps
  closeMenu: () => void
}) => {
  return (
    <Container p={10} maxW="container.lg">
      <SimpleGrid width="100%" columns={4} spacing={10}>
        {React.Children.toArray(
          props?.data?.map((el) => (
            <MegaMenuContentColumnsColumn
              data={el}
              level={0}
              linkProps={props?.linkProps}
              closeMenu={props.closeMenu}
            />
          ))
        )}
      </SimpleGrid>
    </Container>
  )
}

const MegaMenuContentColumnsColumn = (props: {
  data: Maybe<MegaMenuItemFragment>
  level?: number
  linkProps: LinkProps
  closeMenu: () => void
}) => {
  const intl = useIntl()
  const label = props.data?.link?.label ?? ''
  const { isExternal, href } = getLinkTarget(
    props.data?.link as any as ContentfulCTA
  )

  const { hasChildren, children } = useContentfulMegaMenuItem(
    props?.data?.sys?.id ?? ''
  )

  const handleMegaMenuLinkClick = useCallback(() => {
    props.closeMenu()
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: href || '',
      section: intl.formatMessage({ id: 'ariaLabel.header' }),
      clicktext: label,
      loginstatus: '',
    })
  }, [props, label, children])

  return (
    <Box>
      {hasChildren ? (
        <>
          <Text
            mb={1}
            fontWeight="bold"
            fontSize="base"
            color={props?.level ? 'theme.textMuted' : 'theme.text'}
          >
            {label}
          </Text>
          <List>
            {React.Children.toArray(
              children?.map((el: any) => (
                <ListItem>
                  <MegaMenuContentColumnsColumn
                    data={el}
                    level={props?.level || 0 + 1}
                    linkProps={props.linkProps}
                    closeMenu={props.closeMenu}
                  />
                </ListItem>
              ))
            )}
          </List>
        </>
      ) : (
        <Link href={href} passHref>
          <ChakraLink
            mb={1}
            display="inline-block"
            color="theme.textMuted"
            fontSize="desktop.bodySM"
            isExternal={isExternal}
            {...props.linkProps}
            onClick={handleMegaMenuLinkClick}
          >
            {label}
          </ChakraLink>
        </Link>
      )}
    </Box>
  )
}
