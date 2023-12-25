import {
  Accordion,
  AccordionItem,
  Button,
  Link as ChakraLink,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { getLinkTarget } from '@modules/app/utils'
import { useContentfulMegaMenuItem } from '@modules/contentful'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import React, { useRef } from 'react'
import { MegaDrawerBackButton } from './MegaDrawerBackButton'
import { MegaDrawerButton } from './MegaDrawerButton'
import { MegaDrawerItemProps } from './types'

export const MegaDrawerItem = ({ item, closeAll }: MegaDrawerItemProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)
  const id = item?.sys.id ?? ''
  const { isExternal, href } = getLinkTarget(item?.link as any as ContentfulCTA)
  const label = item?.link?.label ?? ''
  const { children, hasChildren } = useContentfulMegaMenuItem(id)

  return (
    <>
      {hasChildren ? (
        <>
          <MegaDrawerButton btnRef={btnRef} onOpen={onOpen} label={label} />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={closeAll}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader
                display={'flex'}
                alignItems="center"
                px={5}
                py={4}
                width="100%"
              >
                <MegaDrawerBackButton onClick={onClose} />
                <Text maxW="md" fontWeight={700} fontSize="base">
                  {label}
                </Text>
                <DrawerCloseButton
                  display={'block'}
                  position={'relative'}
                  marginLeft="auto"
                  top={0}
                  right={0}
                />
              </DrawerHeader>
              <DrawerBody>
                <Accordion allowToggle>
                  {React.Children.toArray(
                    children?.map((item: any) => (
                      // eslint-disable-next-line react/jsx-key
                      <AccordionItem>
                        <MegaDrawerItem item={item} closeAll={closeAll} />
                      </AccordionItem>
                    ))
                  )}
                </Accordion>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <ChakraLink
          style={{ textDecoration: 'none' }}
          href={href}
          isExternal={isExternal}
        >
          <Button
            width="100%"
            height="44px"
            display="flex"
            justifyContent="space-between"
            fontWeight={400}
            fontSize="sm"
            py={3}
            px={4}
            _hover={{ backgroundColor: 'shading.100' }}
            _focus={{ backgroundColor: 'shading.100' }}
            _active={{ backgroundColor: 'shading.100' }}
            backgroundColor="transparent"
            textColor={'inherit'}
            border="0"
          >
            <Text>{label}</Text>
          </Button>
        </ChakraLink>
      )}
    </>
  )
}
