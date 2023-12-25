import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react'
import { NEXT_PUBLIC_OPENPATH_API_ID, paths } from '@modules/app'
import { isEmpty } from '@modules/app/utils'
import {
  DeliveryForm,
  PaymentForm,
  useMultiPageCheckout,
} from '@modules/checkout'
import { useEPManualTransaction } from '@modules/ep/order'
import { useToast } from '@modules/ui'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { OpenPathOrder } from './types'

function formatAddressToOPFormat(
  formData: PaymentForm | DeliveryForm | undefined
) {
  return {
    address1: formData?.line_1 ?? '',
    address2: formData?.line_2 ?? '',
    city: formData?.city ?? '',
    state: formData?.county ?? '',
    zip: formData?.postcode ?? '',
    country: formData?.country ?? '',
  }
}

export const OpenPathForm: React.FC = () => {
  const intl = useIntl()
  const { checkoutData } = useMultiPageCheckout()
  const [isOPReady, setIsOPReady] = useState(false)
  const { saveEPManualTransaction } = useEPManualTransaction()
  const router = useRouter()
  const toast = useToast()

  const onSubmit = useCallback(
    async (rawResponse: string) => {
      const opResponse = rawResponse
        .split('&')
        .reduce((acc: any, item: string) => {
          const property = item.split('=')
          acc[property[0]] = property[1]
          return acc
        }, {})
      // Save Auth on EP
      await saveEPManualTransaction.mutate(
        {
          orderId: checkoutData?.order?.id as string,
          amount: (checkoutData?.order?.meta?.display_price?.with_tax as any)
            ?.amount,
          metadata: opResponse,
        },
        {
          onSuccess: async () => {
            await router.push(paths.CHECKOUT_ORDER_CONFIRMATION)
          },
          onError: async (error) => {
            //In case of error, we need to push the user to the order confirmation page
            //Because the order was created and the payment was authorized
            await router.push(paths.CHECKOUT_ORDER_CONFIRMATION)
          },
        }
      )
    },
    [checkoutData, saveEPManualTransaction, toast, intl]
  )

  const lineItems = useMemo(() => {
    const items = checkoutData?.order?.items
    if (items) {
      const allItems = items.map((item) => ({
        productCode:
          isEmpty(item?.sku) +
          ' ' +
          isEmpty(item?.custom_inputs?.manufacturer_part_num),
        amount:
          ((item?.meta.display_price?.with_tax?.value as any)?.amount || 0) /
          100,
        description: item?.name,
        quantity: item?.quantity,
      }))
      return [...allItems]
    }
    return []
  }, [checkoutData])

  const orderForOpenPath: OpenPathOrder = useMemo(() => {
    const result = {
      orderId: checkoutData?.order?.id ?? '',
      total:
        ((checkoutData?.order?.meta?.display_price?.with_tax as any)?.amount ||
          0) / 100,
      currency:
        checkoutData?.order?.meta?.display_price?.with_tax?.currency ?? '',
      paymentType: 'auth',
      enableECheck: false,
      disableCreditCard: false,
      customer: checkoutData?.customer,
      billingAddress: checkoutData?.payment?.sameAsShipping
        ? formatAddressToOPFormat(checkoutData?.delivery)
        : formatAddressToOPFormat(checkoutData?.payment),
      shippingAddress: formatAddressToOPFormat(checkoutData?.delivery),
      lineItems,
      css: [
        {
          type: 'style',
          cssText: '#radio-cc-container{display:none;}',
        },
        {
          type: 'style',
          cssText: `#submit-card{ height: 40px; border-radius: 0; width: 120px; padding: 0; overflow: hidden;  background: black; border: 0;}`,
        },
        {
          type: 'style',
          cssText:
            '.op-header-label {font-size: 16px !important; font-family: Lato; font-style: normal; font-weight: 700; line-height: 24px; align-self: stretch;}',
        },
        {
          type: 'style',
          cssText: '.op-header-label:after{content: "*"; }',
        },
        {
          type: 'style',
          cssText: `#submit-card span{ visibility: none; color: black; overflow: auto; }`,
        },
        {
          type: 'style',
          cssText: `#submit-card span:before{
                content: "Place Order";
                color: white;
                font-size: 14px;
                font-weight: 700;
                position: absolute;
                width: 107px;
                left: 0;
                margin-left: 7px;
              }`,
        },
        {
          type: 'style',
          cssText: `#spinner{
                margin-left: 50px;
              }`,
        },
        {
          type: 'style',
          cssText: '#payment-form{ margin-top: 0px;margin-bottom: 0px}',
        },
        {
          type: 'style',
          cssText: '#container{ background: transparent !important;}',
        },
        {
          type: 'style',
          cssText: '.card-body{ padding: 0 !important; margin-bottom: -20px;}',
        },
        {
          type: 'style',
          cssText:
            '.form-label-group col-12 op-form-name:after{ padding: 24px;}',
        },
        {
          type: 'style',
          cssText: '.card{ border-color: white;}',
        },
        {
          type: 'style',
          cssText:
            '.invalid-tooltip{ position: initial !important; color: #E53E3E !important; background-color: white !important; padding-left: 10px; !important}',
        },
        {
          type: 'style',
          cssText: '.op-nested-icon-group{ height: 50% !important;}',
        },
        {
          type: 'style',
          cssText:
            '.form-control.is-invalid{ border-bottom: 1px solid #dc3545;}',
        },
        {
          type: 'style',
          cssText: `#payment-method:before{
                  padding: 24px;
              }`,
        },
      ],
    }

    return result
  }, [checkoutData, lineItems])

  const jqueryImport = async () => {
    return await (
      await import('jquery')
    ).default
  }

  useEffect(() => {
    const OP = (window as any).Op
    if ((isOPReady || OP) && checkoutData != null) {
      jqueryImport().then((jquery) => {
        ;(window as any).$ = jquery
        const widget = new OP.PaymentWidget(
          NEXT_PUBLIC_OPENPATH_API_ID,
          orderForOpenPath
        )
        widget.attach('#op-container').then(onSubmit)
      })
    }
  }, [isOPReady, checkoutData, lineItems])
  const renderOpenPath = () => {
    setIsOPReady(true)
  }
  return (
    <>
      <Script
        src="https://asset.openpath.io/js/openpath/op-payment.1.0.0.js"
        async
        onLoad={renderOpenPath}
      />
      <Heading fontSize={{ base: '24', md: '32' }}>
        {intl.formatMessage({ id: 'checkout.creditCard.title' })}
      </Heading>
      <Box
        height="440px"
        position="relative"
        px="6"
        py={{ base: '8', md: '10' }}
        backgroundColor="white"
        mt={{ base: '6', md: '8' }}
        justifyContent="center"
      >
        <Flex
          id="op-container"
          w="100%"
          h="400px"
          alignItems="center"
          backgroundColor="white"
          py="4"
          justifyContent="center"
        ></Flex>
      </Box>
      <Text
        fontSize="mobile.body"
        p="0 15px"
        textAlign="start"
        paddingTop={'24px'}
        paddingLeft="1px"
      >
        {intl.formatMessage(
          { id: 'checkout.payment.placeOrderWarning' },
          {
            returnPolicy: (
              <NextLink passHref href={'/returns-returnspolicy'}>
                <Link
                  textDecoration="underline"
                  textDecorationColor={'gray'}
                  target="_blank"
                >
                  <Text as="span">
                    {intl.formatMessage({
                      id: 'checkout.payment.returnPolicy',
                    })}
                  </Text>
                </Link>
              </NextLink>
            ),
            termsConditions: (
              <NextLink passHref href={'/terms-conditions'}>
                <Link
                  textDecoration="underline"
                  textDecorationColor={'gray'}
                  target="_blank"
                >
                  <Text as="span">
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
    </>
  )
}
