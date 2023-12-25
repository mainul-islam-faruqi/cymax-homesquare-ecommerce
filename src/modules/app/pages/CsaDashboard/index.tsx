import {
  Box,
  Container,
  Flex,
  useBreakpointValue,
  useMediaQuery,
} from '@chakra-ui/react'
import { paths } from '@modules/app/paths'
import { Breadcrumb } from '@modules/components'
import { useUser } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { useCsa } from '../CsaLoginPage/hooks'
import { NavMenuDesktop } from './components/NavMenuDesktop'
import { ProfileInformation } from './components/ProfileInformation'
import { SkeletonLoader } from './components/SkeletonLoader'

export const CsaDashboard = () => {
  const router = useRouter()
  const intl = useIntl()
  const { customer, isLoading: isLoadingCustomer } = useUser()

  const isMobile = useBreakpointValue({ base: true, md: false })
  const [isHigherThan1440] = useMediaQuery(`(min-width: 1440px) `)

  const { token, isLoading } = useCsa()

  useEffect(() => {
    if (!isLoading && !isLoadingCustomer) {
      if (customer) {
        router.push(paths.HOME)
        return //avoid to push customer to login
      }
      if (!token) {
        router.push(paths.CSA_LOGIN)
      }
    }
  }, [isLoading, isLoadingCustomer])

  if (isLoading || !token) {
    return <SkeletonLoader />
  }

  const breadcrumbOptions = [
    {
      title: intl.formatMessage({ id: 'profile.navMenu.profile' }),
      slug: '',
    },
  ]

  return (
    <Box
      maxWidth="container.xl"
      margin="0 auto"
      w="100%"
      px={isHigherThan1440 ? 0 : { base: 0, md: 10 }}
      pb={16}
    >
      {!isMobile && (
        <Breadcrumb items={breadcrumbOptions} ml={3} mt={10} mb={6} />
      )}
      <Flex gap={{ base: 0, md: 10 }} direction={{ base: 'column', md: 'row' }}>
        <Container p={0} maxWidth={{ base: '100%', md: '20rem' }} width="100%">
          {!isMobile && <NavMenuDesktop />}
        </Container>
        {isMobile && (
          <Breadcrumb items={breadcrumbOptions} mt={6} mb={1} ml={5} />
        )}
        <Container p={{ base: 5, md: 0 }} maxWidth="100%">
          <ProfileInformation />
        </Container>
      </Flex>
    </Box>
  )
}
