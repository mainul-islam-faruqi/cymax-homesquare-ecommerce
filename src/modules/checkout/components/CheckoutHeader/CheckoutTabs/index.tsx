import { paths } from '@modules/app'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { CheckoutHeaderInterface } from '..'
import { CheckoutStepLink } from '../../CheckoutStepLink'

export const CheckoutTabs = ({
  disableSteps,
}: Pick<CheckoutHeaderInterface, 'disableSteps'>) => {
  const intl = useIntl()
  const { pathname, push } = useRouter()

  return (
    <>
      <CheckoutStepLink
        title={`1. ${intl.formatMessage({
          id: 'checkout.deliveryTab',
        })}`}
        onClick={() => push(paths.CHECKOUT_DELIVERY)}
        eligible={!disableSteps}
        active={pathname === paths.CHECKOUT_DELIVERY}
      />
      <CheckoutStepLink
        title={`2. ${intl.formatMessage({
          id: 'checkout.paymentTab',
        })}`}
        onClick={() => push(paths.CHECKOUT_PAYMENT)}
        eligible={!disableSteps}
        active={[paths.CHECKOUT_PAYMENT, paths.OPEN_PATH_FORM].includes(
          pathname
        )}
      />
      <CheckoutStepLink
        title={`3. ${intl.formatMessage({
          id: 'checkout.orderPlacedTab',
        })}`}
        active={pathname === paths.CHECKOUT_ORDER_CONFIRMATION}
      />
    </>
  )
}
