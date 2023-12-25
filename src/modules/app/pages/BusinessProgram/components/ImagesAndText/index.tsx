import { Box, Flex, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import Image from 'next/image'
import { useIntl } from 'react-intl'
import { ListOption, useListOptions } from './types'

export const ImagesAndText = () => {
  const intl = useIntl()
  const LIST_OPTIONS = useListOptions()

  return (
    <Box>
      <Box
        height="520px"
        position="relative"
        transform={{ base: 'scaleX(1)', md: 'scaleX(-1)' }}
      >
        <Image
          src="/img/business-program-1.jpg"
          layout="fill"
          objectFit="cover"
          alt="office furniture large width"
        />

        <Box
          position="absolute"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          zIndex={2}
          height="100%"
          width={{ base: '100%', md: '50%' }}
          left={0}
          transform={{ base: 'scaleX(1)', md: 'scaleX(-1)' }}
        >
          <Box width="80%">
            <Text as="p" fontSize="desktop.bodySM" fontWeight="700">
              {intl.formatMessage({ id: 'businessProgram.subTitle' })}
            </Text>
            <Text
              as="h2"
              fontWeight={'extrabold'}
              fontSize={{ base: 'mobile.xl', md: 'desktop.xl' }}
              lineHeight={1.2}
              width={{ base: '80%', md: 'fit-content' }}
            >
              {intl.formatMessage({ id: 'businessProgram.mainTitle' })}
            </Text>
          </Box>
        </Box>
      </Box>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          width={{ base: '100%', md: '50%' }}
          padding={5}
        >
          <Box maxWidth="max-content" width="100%">
            <Text
              as="h3"
              fontSize={{ base: 'desktop.md', md: 'desktop.lg' }}
              fontWeight="extrabold"
              mb={3}
              lineHeight={1.2}
            >
              {intl.formatMessage({ id: 'businessProgram.listTitle' })}
            </Text>
            <UnorderedList paddingInline={1}>
              {LIST_OPTIONS.map(({ id, content }: ListOption) => (
                <ListItem
                  key={id}
                  marginBlock={2}
                  fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
                >
                  {content}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Box>
        <Box
          height={{ base: '300px', md: '400px' }}
          position="relative"
          width={{ base: '100%', md: '50%' }}
        >
          <Image
            src="/img/business-program-2.jpg"
            layout="fill"
            objectFit="cover"
            alt="office furniture medium width"
          />
        </Box>
      </Flex>
      <Text
        display={{ base: 'block', md: 'none' }}
        paddingInline={5}
        paddingTop={5}
        as="h4"
        fontWeight="extrabold"
        fontSize="desktop.md"
      >
        {intl.formatMessage({ id: 'action.signup' })}
      </Text>
    </Box>
  )
}
