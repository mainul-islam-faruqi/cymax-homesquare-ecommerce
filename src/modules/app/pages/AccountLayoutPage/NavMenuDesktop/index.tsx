import { Box, Button, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { useLogout } from '@modules/app/hooks/useLogout'
import { paths } from '@modules/app/paths'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsChat } from 'react-icons/bs'
import { useIntl } from 'react-intl'
import { NavMenuOption, NavMenuProps } from '../types'

export const NavMenuDesktop: React.FC<NavMenuProps> = ({
  navMenuOptions,
  changeMenuOption,
  currentOptionUrl,
}) => {
  const router = useRouter()
  const intl = useIntl()
  const { logout } = useLogout()

  const handleChangeOptionAndRedirect = (option: NavMenuOption) => {
    router.push(option.url)
    changeMenuOption(option.url)
  }

  const handleLogout = async () => {
    logout()
  }

  return (
    <List mt={1} pt={16} as="aside">
      <Text as="h3" fontWeight="bold" pl={4}>
        {intl.formatMessage({ id: 'account.dashboard.title' })}
      </Text>
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
          cursor="pointer"
        >
          <ListIcon
            as={option.icon}
            fontSize={24}
            mr={4}
            transform={'translateY(2px)'}
          />
          <Text as="span">{option.label}</Text>
        </ListItem>
      ))}
      <Box mt={16}>
        <Text as="h3" fontWeight={'bold'} pl={4}>
          {intl.formatMessage({
            id: 'profile.navMenu.title.needHelp',
          })}
        </Text>

        <NextLink href={paths.CONTACT_US} passHref>
          <a target="_blank" rel="noopener noreferrer">
            <ListItem py={3} px={4} cursor="pointer">
              <ListIcon as={BsChat} fontSize={22} mr={2} />
              <Text as="span">
                {intl.formatMessage({
                  id: 'profile.navMenu.customerSupport',
                })}
              </Text>
            </ListItem>
          </a>
        </NextLink>

        <Button
          as="a"
          mt={8}
          width={'100%'}
          p={5}
          bg="theme.background"
          color="primary.500"
          fontSize={14}
          borderWidth={'2px'}
          _hover={{ bg: 'inherit', cursor: 'pointer' }}
          _active={{ bg: 'inherit', cursor: 'pointer' }}
          onClick={handleLogout}
        >
          {intl.formatMessage({ id: 'action.logout' })}
        </Button>
      </Box>
    </List>
  )
}
