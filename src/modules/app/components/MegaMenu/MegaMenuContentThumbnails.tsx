import {
  Box,
  Link as ChakraLink,
  Container,
  LinkProps,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { getLinkTarget } from '@modules/app/utils'
import { ContentfulCTA } from '@modules/contentful/pages/types'
import { Maybe, MegaMenuItemFragment } from '@modules/contentful/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const MegaMenuContentThumbnails = (props: {
  data?: Maybe<MegaMenuItemFragment>[]
  linkProps?: LinkProps
}) => {
  return (
    <Container p={10} maxW="container.lg">
      <SimpleGrid width="100%" columns={4} spacing={10}>
        {React.Children.toArray(
          props?.data?.map((el) => {
            const { isExternal, href } = getLinkTarget(el?.link as any as ContentfulCTA)
            const label = el?.link?.label ?? ''
            const description = el?.description ?? ''
            const imageSrc = el?.imagesCollection?.items?.[0]?.url
            return (
              // eslint-disable-next-line react/jsx-key
              <Box>
                <Link href={href} passHref>
                  <ChakraLink
                    py={1}
                    display="block"
                    textAlign="center"
                    _hover={{ textDecoration: 'none' }}
                    isExternal={isExternal}
                    {...props.linkProps}
                  >
                    <Box
                      width="120px"
                      height="80px"
                      position="relative"
                      borderRadius="base"
                      overflow="hidden"
                      mx="auto"
                      mb={3}
                    >
                      {imageSrc && (
                        <Image
                          src={imageSrc}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          alt=""
                        />
                      )}
                    </Box>
                    <Text fontWeight="bold" color="gray.600">
                      {label}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {description}
                    </Text>
                  </ChakraLink>
                </Link>
              </Box>
            )
          })
        )}
      </SimpleGrid>
    </Container>
  )
}
