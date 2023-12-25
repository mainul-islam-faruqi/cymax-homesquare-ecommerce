import { Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'
import { AccountLayoutPageProps } from '../AccountLayoutPage/types'

const DynamicAccountLayoutPage = dynamic<AccountLayoutPageProps>(
  () => import('../AccountLayoutPage').then((res) => res.AccountLayoutPage),
  { ssr: false }
)

const DynamicUpdateInformationForm = dynamic<any>(
  () => import('./components').then((res) => res.UpdateInformationForm),
  { ssr: false }
)

export const AccountProfilePage = () => {
  const intl = useIntl()

  return (
    <DynamicAccountLayoutPage>
      <Text
        as="h2"
        fontWeight={'bold'}
        fontSize={{ base: 'desktop.md', lg: 'desktop.lg' }}
        pb={5}
      >
        {intl.formatMessage({ id: 'profile.navMenu.profile' })}
      </Text>
      <DynamicUpdateInformationForm />
    </DynamicAccountLayoutPage>
  )
}
