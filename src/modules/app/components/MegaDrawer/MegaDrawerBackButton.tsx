import { IconButton, Link as ChakraLink } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'

interface MegaDrawerBackButtonProps {
  onClick: () => void
}

export const MegaDrawerBackButton = ({
  onClick,
}: MegaDrawerBackButtonProps) => {
  const intl = useIntl()
  return (
    <IconButton
      aria-label={intl.formatMessage({
        id: 'ariaLabel.backDrawer',
      })}
      variant="unstyled"
      width="1.25em"
      justifyContent="space-between"
      icon={<ArrowBackIcon width="1.25em" height="1.25em" onClick={onClick} />}
      display="inline-flex"
    />
  )
}
