import { Button, useMediaQuery } from '@chakra-ui/react'

export interface CheckoutStepLinkProps {
  title: string
  eligible?: boolean
  active?: boolean
  onClick?: () => void
}

export const CheckoutStepLink: React.FC<CheckoutStepLinkProps> = ({
  title,
  eligible,
  onClick,
  active,
}) => {
  const [isValueLess960] = useMediaQuery('(max-width: 960px)')
  return (
    <Button
      width={isValueLess960 ? '33%' : 'unset'}
      padding="8px 12px"
      variant="link"
      color={active ? 'primary.500' : 'shading.600'}
      fontWeight={active ? 'semiBold' : 'normal'}
      borderBottom={active ? '2px' : '0'}
      cursor={eligible ? 'pointer' : 'initial'}
      textDecoration="none"
      fontSize={{ base: 'mobile.bodySM', md: 'desktop.bodySM' }}
      _hover={{
        textDecoration: 'none',
      }}
      onClick={() => eligible && onClick !== undefined && onClick()}
    >
      {title}
    </Button>
  )
}
