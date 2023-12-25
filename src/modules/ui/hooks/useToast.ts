import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

export const useToast = (options?: UseToastOptions) => {
  const toast = useChakraToast({
    position: 'top',
    duration: 4500,
    ...options,
  })
  return toast
}
