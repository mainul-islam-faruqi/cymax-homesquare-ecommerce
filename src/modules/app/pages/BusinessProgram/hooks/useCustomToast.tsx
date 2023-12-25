import { useToast } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const useCustomToast = () => {
  const toast = useToast()
  const intl = useIntl()

  const customToast = (status: 'success' | 'error') =>
    toast({
      status: status,
      position: 'top',
      description:
        status === 'success'
          ? intl.formatMessage({
              id: 'privacyForm.submitSuccessMessage',
            })
          : intl.formatMessage({
              id: 'privacyForm.submitErrorMessage',
            }),
    })

  return customToast
}
