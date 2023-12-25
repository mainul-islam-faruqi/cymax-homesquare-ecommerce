import Image from 'next/image'
import Link from 'next/link'
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Container,
} from '@chakra-ui/react'

export interface HeroProps {
  title?: string
  description?: string
  imageUrl?: string
  imageAlt?: string
  ctaUrl?: string
  ctaLabel?: string
}

export const Hero = ({
  title,
  description,
  imageUrl,
  imageAlt,
  ctaUrl,
  ctaLabel,
}: HeroProps) => {
  return (
    <Box bg="gray.800" as="section" minH="140px" position="relative">
      <Box py="32" position="relative" zIndex={1} px={{ base: '6', md: '8' }}>
        <Container color="white" maxW="container.max" mx="auto">
          <Box maxW="xl">
            <Heading as="h1" size="3xl" fontWeight="extrabold">
              {title}
            </Heading>
            {description && (
              <Text fontSize={{ md: '2xl' }} mt="4" maxW="lg">
                {description}
              </Text>
            )}
            <Stack
              direction={{ base: 'column', md: 'row' }}
              mt="10"
              spacing="4"
            >
              {ctaUrl && ctaLabel && (
                <Link href={ctaUrl} passHref>
                  <Button
                    as="a"
                    colorScheme="blue"
                    px="8"
                    rounded="base"
                    size="lg"
                    fontSize="md"
                    fontWeight="bold"
                  >
                    {ctaLabel}
                  </Button>
                </Link>
              )}
            </Stack>
          </Box>
        </Container>
      </Box>
      <Flex
        position="absolute"
        insetX="0"
        insetY="0"
        w="full"
        h="full"
        overflow="hidden"
        align="center"
      >
        <Box position="relative" w="full" h="full">
          <Box
            w="full"
            h="full"
            objectPosition="top bottom"
            position="absolute"
          >
            {imageUrl && (
              <Image
                alt={imageAlt || ''}
                src={imageUrl}
                layout="fill"
                objectFit="cover"
              />
            )}
          </Box>
          <Box position="absolute" w="full" h="full" bg="blackAlpha.600" />
        </Box>
      </Flex>
    </Box>
  )
}
