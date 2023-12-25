import { Box, Button, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { useLogout } from '@modules/app/hooks/useLogout'
import { useRouter } from 'next/router'
import { BiSupport } from 'react-icons/bi'
import { useIntl } from 'react-intl'

export const NavMenuDesktop = () => {
  const intl = useIntl()
  const router = useRouter()

  const { logout } = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <List mt={1} pt={16} as="aside">
      <Text as="h3" fontWeight="bold" pl={4}>
        {intl.formatMessage({ id: 'account.dashboard.title' })}
      </Text>
      <ListItem
        py={3}
        px={4}
        fontWeight={'bold'}
        borderBottomWidth="2px"
        borderBottomColor={'primary.500'}
        cursor="pointer"
      >
        <ListIcon
          as={BiSupport}
          fontSize={24}
          mr={4}
          transform={'translateY(2px)'}
        />
        <Text as="span">
          {intl.formatMessage({ id: 'profile.navMenu.profile' })}
        </Text>
      </ListItem>

      <Box>
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
