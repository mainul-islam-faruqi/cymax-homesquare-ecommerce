import {
  Box,
  Container,
  Flex,
  List,
  ListIcon,
  ListItem,
  Text,
  useOutsideClick,
} from '@chakra-ui/react'
import { paths } from '@modules/app/paths'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { BsChat } from 'react-icons/bs'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useIntl } from 'react-intl'
import { NavMenuOption, NavMenuProps } from '../types'

export const NavMenuMobile: React.FC<NavMenuProps> = ({
  navMenuOptions,
  changeMenuOption,
  currentOptionUrl,
  selectedOption,
}) => {
  const router = useRouter()
  const intl = useIntl()
  const ref = useRef<HTMLDivElement>(null)

  const [openMenu, setOpenMenu] = useState(false)

  const handleChangeOptionAndRedirect = (option: NavMenuOption) => {
    router.push(option.url)
    changeMenuOption(option.url)
  }

  useOutsideClick({
    ref,
    handler: () => setOpenMenu(false),
  })

  return (
    <Container px={0} position="relative" maxW="100%" ref={ref}>
      <Flex
        p={4}
        borderBottomWidth="2px"
        borderBottomColor="shading.200"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => setOpenMenu(!openMenu)}
        cursor="pointer"
      >
        <Text as="h3">{selectedOption}</Text>
        <Box>{openMenu ? <IoIosArrowUp /> : <IoIosArrowDown />}</Box>
      </Flex>
      {openMenu && (
        <List
          bg="white"
          height="auto"
          width="100%"
          position="absolute"
          left="0"
          borderBottomWidth="1px"
          borderBottomColor="shading.200"
          zIndex={2}
        >
          {navMenuOptions.map((option: NavMenuOption) => (
            <ListItem
              key={option.id}
              onClick={() => handleChangeOptionAndRedirect(option)}
              py={3}
              px={4}
              fontWeight={currentOptionUrl === option.url ? 'bold' : 'normal'}
              borderBottomWidth="2px"
              borderBottomColor={
                currentOptionUrl === option.url ? 'primary.500' : 'transparent'
              }
            >
              <NextLink
                href={option.url}
                passHref
                aria-label={intl.formatMessage({ id: 'ariaLabel.home' })}
              >
                <Box as="a">
                  <ListIcon as={option.icon} fontSize={24} mr={4} />
                  <Text as="span">{option.label}</Text>
                </Box>
              </NextLink>
            </ListItem>
          ))}
          <ListItem py={3} px={4} borderBottomWidth="2px" cursor="pointer">
            <Box
              as="a"
              href={paths.CONTACT_US}
              target="_blank"
              rel="noopener noreferrer"
              w="100%"
              h="100%"
              cursor="pointer"
            >
              <ListIcon as={BsChat} fontSize={24} mr={4} />
              <Text as="span">
                {intl.formatMessage({
                  id: 'profile.navMenu.customerSupport',
                })}
              </Text>
            </Box>
          </ListItem>
        </List>
      )}
    </Container>
  )
}
