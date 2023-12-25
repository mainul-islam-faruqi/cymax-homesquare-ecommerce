import { ReactNode } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'

interface CallToActionTextProps {
  heading?: string
  contentText?: ReactNode
  contentNode?: ReactNode
  ctaUrl?: string
  ctaLabel?: string
}

export const CallToActionText = ({
  heading,
  contentText,
  contentNode,
  ctaUrl,
  ctaLabel,
}: CallToActionTextProps) => {
  const sizeHeadingVariant = useBreakpointValue({ base: 'md', md: 'lg' })
  return (
    <Box as="section" bg="bg-surface">
      <Container py={{ base: '16', md: '24' }}>
        <Stack spacing={{ base: '8', md: '10' }}>
          <Stack spacing={{ base: '4', md: '5' }} align="center">
            {heading && <Heading size={sizeHeadingVariant}>{heading}</Heading>}
            {contentText && (
              <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
                {contentText}
              </Text>
            )}
            {contentNode && (
              <Box
                color="muted"
                maxW="2xl"
                textAlign="center"
                fontSize="xl"
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
              justify="center"
            >
              <Link href={ctaUrl} passHref>
                <Button as="a" size="lg" borderRadius="full">
                  Learn more
                </Button>
              </Link>
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
