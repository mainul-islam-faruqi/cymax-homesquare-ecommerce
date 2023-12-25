import { Link, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'
import { useIntl } from 'react-intl'

export const ReturnPolicy: React.FC = () => {
  const intl = useIntl()

  return (
    <Text mt="6" fontSize="mobile.body">
      {intl.formatMessage(
        { id: 'checkout.payment.placeOrderWarning' },
        {
          returnPolicy: (
            <NextLink passHref href={'/returns-returnspolicy'}>
              <Link target="_blank">
                <Text
                  as="span"
                  textDecoration="underline"
                  textUnderlineOffset={'2px'}
                >
                  {intl.formatMessage({
                    id: 'checkout.payment.returnPolicy',
                  })}
                </Text>
              </Link>
            </NextLink>
          ),
          termsConditions: (
            <NextLink passHref href={'/terms-conditions'}>
              <Link target="_blank">
                <Text
                  as="span"
                  textDecoration="underline"
                  textUnderlineOffset={'2px'}
                >
                  {intl.formatMessage({
                    id: 'checkout.payment.termsConditions',
                  })}
                </Text>
              </Link>
            </NextLink>
          ),
        }
      )}
    </Text>
  )
}
