import { Button, Stack } from '@chakra-ui/react'
import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { clickEvent } from '@modules/gtm/clickEvent'
import { useElasticPath } from '@myplanetdigital/elasticpath'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { ButtonsType } from './types'

export const Buttons = ({ handleAddToCart, addCartItem }: ButtonsType) => {
  const { accessToken } = useElasticPath()
  const { asPath } = useRouter()
  const intl = useIntl()
  const { token: csaToken } = useCsa()

  const handleAddToCartClick = () => {
    clickEvent({
      event: 'clickEvent',
      category: '',
      subcategory: '',
      page_details: asPath || '',
      section: intl.formatMessage({ id: 'ariaLabel.addToCartPDP' }),
      clicktext: intl.formatMessage({ id: 'action.addToCart' }),
      loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
    })
    if (handleAddToCart) {
      handleAddToCart()
    }
  }

  // Logs when accessToken is invalid
  if (!Boolean(accessToken)) {
    console.log('TRACE: Access token is not valid on add to cart button.')
  }

  return (
    <Stack direction="row" align="center" spacing={2} pb={7}>
      <Button
        id="addToCart"
        size="xl"
        width={{ base: '100%' }}
        colorScheme="shading.900"
        onClick={handleAddToCartClick}
        isLoading={addCartItem.isLoading || !Boolean(accessToken)}
        fontSize="desktop.body"
      >
        {intl.formatMessage({ id: 'action.addToCart' })}
      </Button>
    </Stack>
  )
}
