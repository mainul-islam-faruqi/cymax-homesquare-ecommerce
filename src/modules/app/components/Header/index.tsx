import { Box, useMediaQuery } from '@chakra-ui/react'
import { AccessibilityBanner, HeaderDesktop } from '@modules/app'
import { useCart } from '@myplanetdigital/elasticpath'
import { useEffect, useState } from 'react'
import { PromotionalBanner } from '../PromotionalBanner'
import HeaderMobile from './HeaderMobile'
import { HeaderObjectProps } from './types'

export const Header = ({ headerData, headerMenu }: HeaderObjectProps) => {
  const { cart } = useCart()

  const [isMinWidth1100, setIsMinWidth1100] = useState<boolean>(false)

  const [mediaQuery] = useMediaQuery('(min-width: 1100px)')

  useEffect(() => {
    if (mediaQuery !== isMinWidth1100) {
      setIsMinWidth1100(mediaQuery)
    }
  }, [mediaQuery, isMinWidth1100])

  const promotionalBannerText = headerData?.fields?.promotionalText

  return (
    <Box
      zIndex="docked"
      bg="transparent"
      w="100%"
      position="sticky"
      top={0}
      id="global-header-container"
    >
      <AccessibilityBanner />
      <PromotionalBanner text={promotionalBannerText} />
      {!isMinWidth1100 ? (
        <HeaderMobile
          headerMenu={headerMenu}
          headerData={headerData}
          cartQuantity={cart.quantity}
          cartData={cart?.data}
        />
      ) : (
        <HeaderDesktop
          headerData={headerData}
          headerMenu={headerMenu}
          cartQuantity={cart.quantity}
          cartData={cart.data}
        />
      )}
    </Box>
  )
}
