import {
  Box,
  Container,
  Flex,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react'
import { useAuthGuard } from '@modules/app/hooks'
import { Breadcrumb } from '@modules/components'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useNavMenuOptions } from './hooks'
import { NavMenuDesktop } from './NavMenuDesktop'
import { NavMenuMobile } from './NavMenuMobile'
import { AccountLayoutPageProps } from './types'

export const AccountLayoutPage: React.FC<AccountLayoutPageProps> = ({
  children,
}) => {
  const router = useRouter()
  const currentRoute = router.route
  const isMobile = useBreakpointValue({ base: true, md: false })
  const [isHigherThan1440] = useMediaQuery(`(min-width: 1440px) `)

  const [currentOptionUrl, setCurrentOptionUrl] = useState<string>(currentRoute)
  const { navMenuOptions, findSelectedOption } = useNavMenuOptions()

  const changeMenuOption = (value: string) => {
    if (currentOptionUrl === value) return

    setCurrentOptionUrl(value)
  }

  const breadcrumbOptions = [
    {
      title: findSelectedOption(currentRoute) ?? '',
      slug: currentRoute,
    },
  ]

  const { isAuth } = useAuthGuard()
  if (!isAuth) {
    return null
  }
  console.log(router, 'router')

  return (
    <Box
      maxWidth="container.xl"
      margin="0 auto"
      w="100%"
      px={isHigherThan1440 ? 0 : { base: 0, md: 10 }}
    >
      {!isMobile && (
        <Breadcrumb items={breadcrumbOptions} ml={3} mt={10} mb={6} />
      )}
      <Flex gap={{ base: 0, md: 10 }} direction={{ base: 'column', md: 'row' }}>
        <Container p={0} maxWidth={{ base: '100%', md: '20rem' }} width="100%">
          {isMobile ? (
            <NavMenuMobile
              navMenuOptions={navMenuOptions}
              changeMenuOption={changeMenuOption}
              currentOptionUrl={currentOptionUrl}
              selectedOption={findSelectedOption(currentRoute)}
            />
          ) : (
            <NavMenuDesktop
              navMenuOptions={navMenuOptions}
              changeMenuOption={changeMenuOption}
              currentOptionUrl={currentOptionUrl}
            />
          )}
        </Container>
        {isMobile && (
          <Breadcrumb items={breadcrumbOptions} mt={6} mb={1} ml={5} />
        )}
        <Container p={{ base: 5, md: 0 }} maxWidth="100%">
          {children}
        </Container>
      </Flex>
    </Box>
  )
}
