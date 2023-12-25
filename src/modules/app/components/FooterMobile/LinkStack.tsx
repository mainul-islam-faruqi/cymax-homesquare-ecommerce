import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Link as ChakraLink,
  Stack,
} from '@chakra-ui/react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'

import { getLinkTarget } from '@modules/app/utils'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import { useMegaMenu } from '@myplanetdigital/ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LinkItem, LinkStackProps } from './types'

export const LinkStack = ({ item, level }: LinkStackProps) => {
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

  return (
    <Stack spacing="1" minW={{ lg: '40' }}>
      {!hasChildren ? (
        <Link href={href} passHref>
          <ChakraLink
            py={3}
            px={4}
            display="block"
            color="shading.900"
            fontSize="sm"
            {...linkProps}
            isExternal={isExternal}
          >
            {label}
          </ChakraLink>
        </Link>
      ) : (
        <>
          <Accordion allowToggle width="100%" marginTop="0 !important">
            <AccordionItem border={0}>
              {({ isExpanded }) => (
                <>
                  <h3>
                    <AccordionButton
                      py={3}
                      px={4}
                      borderBottom={'1px solid'}
                      borderColor="gray.200"
                    >
                      <Box fontSize="sm" flex="1" textAlign="left">
                        {label}
                      </Box>
                      {isExpanded ? (
                        <MinusIcon fontSize="12px" />
                      ) : (
                        <AddIcon fontSize="12px" />
                      )}
                    </AccordionButton>
                  </h3>
                  <AccordionPanel pt={0} px={0} pb={2}>
                    {React.Children.toArray(
                      children?.map((item: any) => {
                        return (
                          // eslint-disable-next-line react/jsx-key
                          <LinkStack
                            item={item as LinkItem}
                            level={level + 1}
                          />
                        )
                      })
                    )}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </>
      )}
    </Stack>
  )
}
