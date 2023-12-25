import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Button, Text } from '@chakra-ui/react'
import { FocusableElement } from '@chakra-ui/utils'
import { useIntl } from 'react-intl'

interface MegaMenuButtonProps {
  label: string
  onOpen: () => void
  btnRef:
    | (React.RefObject<FocusableElement> & React.LegacyRef<HTMLButtonElement>)
    | undefined
}

export const MegaDrawerButton = ({
  label,
  onOpen,
  btnRef,
}: MegaMenuButtonProps) => {
  const intl = useIntl()
  return (
    <Button
      aria-label={intl.formatMessage({
        id: 'ariaLabel.openDrawer',
      })}
      ref={btnRef}
      onClick={onOpen}
      width="100%"
      display="flex"
      justifyContent="space-between"
      fontWeight={400}
      fontSize="sm"
      height={'fit-content'}
      py={3}
      px={4}
      _hover={{ backgroundColor: 'shading.100' }}
      _focus={{ backgroundColor: 'shading.100' }}
      _active={{ backgroundColor: 'shading.100' }}
      backgroundColor="transparent"
      textColor={'inherit'}
      border="0"
    >
      <Text>{label}</Text>
      <ArrowForwardIcon />
    </Button>
  )
}
