import { Box, Link as ChakraLink } from '@chakra-ui/react'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { getLinkTarget } from '@modules/app/utils'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { Maybe, MegaMenuItemFragment } from '@modules/contentful/utils'
import { clickEvent } from '@modules/gtm/clickEvent'
import { useMegaMenu } from '@modules/ui'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { MegaMenuContent } from './MegaMenuContent'

interface MegaMenuItemProps {
  item: Maybe<MegaMenuItemFragment>
}

export const MegaMenuItem = ({ item }: MegaMenuItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  const closeMenu = () => {
    onToggle()
  }
  const router = useRouter()
  const { token: csaToken } = useCsa()
  const id = item?.sys.id ?? ''
  const { isExternal, href } = getLinkTarget(item?.link as any as ContentfulCTA)
  const label = item?.link?.label ?? ''
  const variant = item?.variant ?? ''
  const { children, hasChildren } = useContentfulMegaMenuItem(id)

  const handleMegaMenuLinkClick = useCallback(() => {
    clickEvent({
      event: 'clickEvent',
      category: item?.link?.label || '',
      subcategory: '',
      page_details: href || '',
      section: item?.__typename || '',
      clicktext: label,
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
  }, [item, label, children])

  const {
    linkProps: { onClick, ...linkProps },
    rootProps,
    motionProps,
    renderContent,
    childrenLinkProps,
    onToggle,
  } = useMegaMenu({
    item: {
      href,
      hasChildren,
    },
    routerPush: router.push,
  })

  return (
    <Box
      transition="border 0.3s"
      borderBottom="2px solid"
      borderColor="transparent"
      _hover={{
        borderBottom: '2px solid',
        borderColor: 'theme.text',
      }}
      {...rootProps}
    >
      <Link href={href} passHref>
        <ChakraLink
          py={2}
          px={4}
          display="block"
          color="theme.text"
          fontSize="sm"
          fontWeight="regular"
          {...linkProps}
          isExternal={isExternal}
          _hover={{
            textDecoration: 'none',
          }}
          onClick={handleMegaMenuLinkClick}
        >
          {label}
        </ChakraLink>
      </Link>

      <AnimatePresence>
        {renderContent && (
          <motion.div {...motionProps}>
            <Box
              borderBottom="1px"
              borderBottomColor="gray.400"
              minHeight="200px"
              background="white"
              overflowY="auto"
              maxH="calc(100vh - 240px)"
            >
              <MegaMenuContent
                data={children}
                variant={variant}
                linkProps={childrenLinkProps}
                closeMenu={closeMenu}
              />
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}
