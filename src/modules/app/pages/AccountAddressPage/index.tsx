import { Box, Text } from '@chakra-ui/react'
import { NEXT_PUBLIC_CUSTOMER_SERVICE_EMAIL } from '@modules/app/constants'
import { EpAddressInterface } from '@modules/ep'
import { useAddress } from '@myplanetdigital/elasticpath'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useIntl } from 'react-intl'
import { AccountLayoutPageProps } from '../AccountLayoutPage/types'
import { AddressOneForm } from './components'

const CONTACT_EMAIL = NEXT_PUBLIC_CUSTOMER_SERVICE_EMAIL

const DynamicAccountLayoutPage = dynamic<AccountLayoutPageProps>(
  () => import('../AccountLayoutPage').then((res) => res.AccountLayoutPage),
  { ssr: false }
)

export const AccountAddressPage = () => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'profile.navMenu.addresses' })
  const { addresses } = useAddress()

  return (
    <DynamicAccountLayoutPage>
      <Text
        as="h2"
        fontWeight={'bold'}
        fontSize={{ base: 'desktop.md', lg: 'desktop.lg' }}
        pb={5}
      >
        {title}
      </Text>
      {Boolean(addresses?.length) ? (
        addresses?.map((address: EpAddressInterface, index) => {
          const addressId = (address as EpAddressInterface & { id: string }).id
          return (
            <AddressOneForm
              key={index}
              address={address}
              addressId={addressId}
            />
          )
        })
      ) : (
        <AddressOneForm />
      )}
      <Box mb={{ base: 5, md: 14 }} mt={{ base: 5, md: 8 }}>
        <Text as="p" fontSize={{ base: 'mobile.body', lg: 'desktop.body' }}>
          {intl.formatMessage({ id: 'sso.address.contactEmail' })}
          <Link href={`mailto:${CONTACT_EMAIL}`} passHref>
            <Text
              as="a"
              borderBottomWidth="1px"
              pb="1px"
              borderBottomColor="theme.text"
              cursor="pointer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              {CONTACT_EMAIL}
            </Text>
          </Link>
        </Text>
      </Box>
    </DynamicAccountLayoutPage>
  )
}
