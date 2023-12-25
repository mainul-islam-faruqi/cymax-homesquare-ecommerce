import { Box, useMediaQuery } from '@chakra-ui/react'
import { Breadcrumb } from '@modules/components'
import { useIntl } from 'react-intl'
import { Form, ImagesAndText } from './components'

export const BusinessProgram = () => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'businessProgram.title' })
  const [isHigherThan1440] = useMediaQuery(`(min-width: 1440px) `)

  const BREADCRUMB_OPTIONS = [
    {
      title: title,
      slug: '/business-program',
    },
  ]

  return (
    <Box>
      <Box
        maxW="container.xl"
        margin="0 auto"
        px={isHigherThan1440 ? 0 : { base: 5, md: 10 }}
        paddingBottom={3}
      >
        <Breadcrumb items={BREADCRUMB_OPTIONS} ml="0" mt={10} mb={1} />
      </Box>
      <ImagesAndText />
      <Box p={{ base: 5, md: 10 }} display="flex" justifyContent="center">
        <Form />
      </Box>
    </Box>
  )
}
