import { paths } from '@modules/app'
import { PaypalReturn } from '@modules/checkout'
import { GetServerSidePropsContext } from 'next'

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const success = context?.query?.success
  // Only show the page if the success paramater is equal to true
  if (success === 'true') {
    return {
      props: {},
    }
  }
  // If no `success` param or if it's not true go back to step 2
  return {
    redirect: {
      destination: paths.CHECKOUT_PAYMENT,
      permanent: false,
    },
  }
}

export default PaypalReturn
