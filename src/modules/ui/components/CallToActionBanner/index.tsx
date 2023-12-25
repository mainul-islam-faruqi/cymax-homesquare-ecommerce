import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface CallToActionBannerProps {
  heading?: string
  contentText?: ReactNode
  contentNode?: ReactNode
  ctaUrl?: string
  ctaLabel?: string
}

export const CallToActionBanner = ({
  heading,
  contentText,
  contentNode,
  ctaUrl,
  ctaLabel,
}: CallToActionBannerProps) => {
  const fontSizeBreakpoint = useBreakpointValue({ base: 'lg', lg: 'xl' })
  return (
    <Container py={{ base: '16', md: '24' }} maxW="container.xl">
      <Box
        bg="blue.700"
        color="white"
        borderRadius="xl"
        px={{ base: '6', lg: '16' }}
        py={{ base: '10', lg: '16' }}
      >
        <Stack
          spacing="8"
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
        >
          <Stack spacing="4" maxW="2xl">
            {heading && <Heading size="xl">{heading}</Heading>}
            {contentText && (
              <Text color="white" fontSize={fontSizeBreakpoint}>
                {contentText}
              </Text>
            )}
            {contentNode && (
              <Box
                color="white"
                fontSize={fontSizeBreakpoint}
                sx={{
                  '& > p': {
                    marginTop: '20px',
                  },
                }}
              >
                {contentNode}
              </Box>
            )}
          </Stack>

          {ctaUrl && ctaLabel && (
            <Stack
              spacing="3"
              direction={{ base: 'column', sm: 'row' }}
              justify={{ base: 'center' }}
              alignItems="center"
            >
              <Link href={ctaUrl} passHref>
                <Button as="a" colorScheme="blue" size="lg" width="100%">
                  {ctaLabel}
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Box>
    </Container>
  )
}
