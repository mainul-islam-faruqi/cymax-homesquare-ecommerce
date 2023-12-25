import { Dispatch, SetStateAction } from 'react'
import { Alert, AlertDescription, AlertIcon, Flex } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

interface PromoCodeAlertProps {
  promoCodeStatus?: {
    status?: string
    message?: string
  }
  setPromoCodeStatus: Dispatch<
    SetStateAction<{
      status?: string
      message?: string | undefined
    }>
  >
}

export const PromoCodeAlert = ({
  promoCodeStatus,
  setPromoCodeStatus,
}: PromoCodeAlertProps) => {
  if (!promoCodeStatus?.message) return null

  const closeMessage = () => setPromoCodeStatus({ message: '' })

  return (
    <Alert
      status={promoCodeStatus.status! as 'success' | 'error'}
      variant="left-accent"
      display="flex"
      justifyContent="space-between"
    >
      <Flex>
        <AlertIcon />
        <AlertDescription>{promoCodeStatus.message}</AlertDescription>
      </Flex>

      <SmallCloseIcon
        alignSelf={'center'}
        marginLeft={6}
        cursor={'pointer'}
        onClick={closeMessage}
      />
    </Alert>
  )
}
