import { Box, Text, Flex, useMediaQuery } from '@chakra-ui/react'
import { Breadcrumb } from '@modules/components'
import { useIntl } from 'react-intl'
import Image from 'next/image'
import { ContactUsForm } from './components'

export const ContactUs = () => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'contactUs.title' })
  const [isHigherThan1440] = useMediaQuery(`(min-width: 1440px) `)

  const BREADCRUMB_OPTIONS = [
    {
      title: title,
      slug: '/contact-us',
    },
  ]

  return (
    <Box>
      <Box
        maxW="container.xl"
        margin="0 auto"
        marginBlock={-2}
        px={isHigherThan1440 ? 0 : { base: 5, md: 10 }}
      >
        <Breadcrumb items={BREADCRUMB_OPTIONS} ml="0" mt={10} mb={1} />
        <Text
          as="h2"
          fontSize={{ base: 'desktop.md', md: 'desktop.lg' }}
          fontWeight="extrabold"
        >
          {title}
        </Text>
      </Box>
      <Flex
        mt={6}
        w="100%"
        position="relative"
        alignItems="center"
        justifyContent="center"
        h={{ base: '200px', md: '350px' }}
      >
        <Text
          as="h1"
          zIndex={2}
          fontWeight="bold"
          color="shading.100"
          position="absolute"
          textAlign="center"
          fontSize={{ base: 'mobile.xxl', md: 'desktop.xl' }}
        >
          {title}
        </Text>
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="black"
          zIndex={1}
          opacity=".6"
        />
        <Image
          src={'/img/contact-us.jpg'}
          layout="fill"
          objectFit="cover"
          alt={title}
        />
      </Flex>
      <Box p={{ base: 5, md: 10 }} display="flex" justifyContent="center">
        <ContactUsForm />
      </Box>
    </Box>
  )
}
