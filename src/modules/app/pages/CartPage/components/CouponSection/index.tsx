import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, useMediaQuery } from '@chakra-ui/react'
import {
  useCart,
  useCartPromotion,
  useEPCartKey,
} from '@myplanetdigital/elasticpath'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useQuery } from 'react-query'

interface CouponSectionProps {
  itemLevelPromotions: any[]
  applyPromotionToCart: {
    mutate: (params: { code: string }) => Promise<void>
    isLoading: boolean
  }
  removePromotionFromCart: {
    mutate: (params: { itemId: string }) => Promise<void>
    isLoading: boolean
  }
  deleteCartDiscount: (cartId: string, promoCode: string) => Promise<boolean>
  setPromoCodeStatus: Dispatch<
    SetStateAction<{
      status?: string
      message?: string | undefined
    }>
  >
}

interface PROMOTION {
  type?: string
  data: {
    id?: string
    code?: string
    cart?: string
  }
}

const PROMOTION_TYPES = { CART_LEVEL: 'CART_LEVEL', ITEM_LEVEL: 'ITEM_LEVEL' }

export const CouponSection = ({
  applyPromotionToCart,
  removePromotionFromCart,
  deleteCartDiscount,
  setPromoCodeStatus,
  itemLevelPromotions,
}: CouponSectionProps) => {
  const { code, buttonProps, inputProps, promotionItems, setCode } =
    useCartPromotion()
  const { cartId } = useCart()
  const { refetch } = useQuery([useEPCartKey])
  const [currentCode, setCurrentCode] = useState('')
  let activePromotions: PROMOTION[] = []

  for (let i = 0; i < promotionItems.length; i++) {
    activePromotions.push({
      type: PROMOTION_TYPES.CART_LEVEL,
      data: {
        id: promotionItems[i]?.id,
        code: promotionItems[i]?.sku,
        cart: '',
      },
    })
  }

  for (let i = 0; i < itemLevelPromotions.length; i++) {
    activePromotions.push({
      type: PROMOTION_TYPES.ITEM_LEVEL,
      data: {
        id: '',
        code: itemLevelPromotions[i]?.code,
        cart: cartId,
      },
    })
  }

  useEffect(() => {
    const removeOldPromotions = async () => {
      const currentPromoActive =
        activePromotions[0] && activePromotions[0].data.code === currentCode
      if (activePromotions.length > 1 || !currentPromoActive) {
        for (let i = 0; i < activePromotions.length; i++) {
          if (
            activePromotions[i].data.code !== currentCode &&
            !removePromotionFromCart.isLoading
          ) {
            if (activePromotions[i].type === PROMOTION_TYPES.CART_LEVEL) {
              await removePromotionFromCart.mutate({
                itemId: activePromotions[i]?.data?.id || '',
              })
            } else if (
              activePromotions[i].type === PROMOTION_TYPES.ITEM_LEVEL
            ) {
              await deleteCartDiscount(
                cartId,
                activePromotions[i]?.data?.code || ''
              )
              await refetch()
            }
          }
        }
      }

      if (!removePromotionFromCart.isLoading) {
        await applyPromotionToCart.mutate({ code: currentCode })
        setCode('')
        setCurrentCode('')
      }
    }

    try {
      if (currentCode) {
        removeOldPromotions()
      }
    } catch (e) {
      console.info(e)
    }
  }, [currentCode, activePromotions.length, removePromotionFromCart.isLoading])

  const [showInput, setShowInput] = useState<boolean>(false)
  const intl = useIntl()

  const [isInOverflowRange] = useMediaQuery(
    '(min-width: 768px) and (max-width: 860px)'
  )
  const [isUnder350px] = useMediaQuery('(max-width: 350px)')
  return (
    <Box py="3" borderTop="1px" borderBottom="1px" borderColor="shading.200">
      <Flex justify="space-between" fontSize="sm">
        <Button
          type="button"
          variant="link"
          fontSize={{ base: 'mobile.body', md: 'desktop.bodySM' }}
          color="shading.900"
          fontWeight="extrabold"
          onClick={() => setShowInput(!showInput)}
        >
          {showInput ? (
            <MinusIcon marginRight="2" />
          ) : (
            <AddIcon marginRight="2" />
          )}
          {intl.formatMessage({ id: 'cart.redeemCoupon' })}
        </Button>
      </Flex>

      {showInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (promotionItems?.some(({ sku }) => sku === code)) {
              setPromoCodeStatus({
                status: 'error',
                message: intl.formatMessage({
                  id: 'cart.alreadyAppliedCoupon',
                }),
              })
              return
            }
            setCurrentCode(code)
          }}
        >
          <Flex align="center" marginTop="2">
            <Input
              {...inputProps}
              minH="40px"
              placeholder={intl.formatMessage({ id: 'cart.couponPlaceholder' })}
              borderRadius="5px 0 0 5px"
              borderRight="0"
              _focus={{
                boxShadow: 'none',
                borderColor: 'primary.500',
              }}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              _placeholder={{
                fontSize:
                  isInOverflowRange || isUnder350px
                    ? 'desktop.bodySM'
                    : 'desktop.bodyMD',
              }}
            />
            <Button
              {...buttonProps}
              minH="42px"
              type="submit"
              variant="solid"
              borderRadius="0 5px 5px 0"
              borderLeft="none"
              opacity="1 !important"
              _disabled={{
                backgroundColor: 'primary.500',
              }}
              _hover={{
                border: '1px',
                borderColor: 'shading.900',
              }}
            >
              {intl.formatMessage({ id: 'cart.submitCouponCode' })}
            </Button>
          </Flex>
        </form>
      )}
    </Box>
  )
}
