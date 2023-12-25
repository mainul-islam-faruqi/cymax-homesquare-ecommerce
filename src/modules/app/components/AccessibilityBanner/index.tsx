import { Center, Link, Text } from '@chakra-ui/react'
import {
  CYMAX_ACCESSIBILITY_STATEMENT_URL,
  HOMESQUARE_ACCESSIBILITY_STATEMENT_URL,
  NEXT_PUBLIC_STORE_LITERAL,
} from '@modules/app/constants'
import { useIntl } from 'react-intl'

export const AccessibilityBanner = () => {
  const intl = useIntl()

  return (
    <>
      <Link
        position={'absolute'}
        zIndex="999"
        tabIndex={1}
        left="-999px"
        background={'#fff'}
        _focus={{
          display: 'block',
          w: '100%',
          padding: '1px',
          color: 'white',
          position: 'static !important',
          textDecoration: 'underline',
        }}
        href={
          String(NEXT_PUBLIC_STORE_LITERAL).toLowerCase().includes('cymax')
            ? CYMAX_ACCESSIBILITY_STATEMENT_URL
            : HOMESQUARE_ACCESSIBILITY_STATEMENT_URL
        }
      >
        <Center
          fontSize="1.2em "
          position={'static'}
          zIndex="999"
          margin={'5px 35%'}
          padding={'5px 10px'}
          borderRadius={'25px'}
          border={'4px solid #fff'}
          background={'#168a97'}
        >
          <Text>{intl.formatMessage({ id: 'accessibility.statement' })}</Text>
        </Center>
      </Link>

      <Link
        position={'absolute'}
        zIndex="999"
        tabIndex={2}
        left="-999px"
        background={'#fff'}
        _focus={{
          display: 'block',
          w: '100%',
          padding: '1px',
          color: 'white',
          position: 'static !important',
          textDecoration: 'underline',
        }}
        href="#main"
      >
        <Center
          bg="#168a97"
          fontSize="1.2em "
          position={'static'}
          zIndex="999"
          margin={'5px 35%'}
          padding={'5px 10px'}
          borderRadius={'25px'}
          border={'4px solid #fff'}
          background={'#168a97'}
        >
          <Text>
            {intl.formatMessage({ id: 'accessibility.main.content' })}
          </Text>
        </Center>
      </Link>
      <Link
        id="main"
        left="-999px"
        position={'absolute'}
        tabIndex={3}
        _focus={{
          color: 'white',
          position: 'absolute !important',
          textDecoration: 'underline',
        }}
      >
        {' '}
      </Link>
    </>
  )
}
