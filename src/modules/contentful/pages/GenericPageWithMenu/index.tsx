import { Box, Flex } from '@chakra-ui/react'
import { Accordion, Breadcrumb } from '@modules/components'
import { ComponentResolver } from '@modules/contentful'
import { useGtmPageView } from '@modules/gtm'
import { FunctionComponent } from 'react'
import { PreviewBanner } from '../PageBlocks/PreviewBanner'
import { SEO } from '../PageBlocks/SEO'
import { ContentfulGenericPageProps } from '../types'

export const GenericPageWithMenu: FunctionComponent<
  ContentfulGenericPageProps
> = ({ data, isPreview }) => {
  const pageItems = data?.fields.items
  const accordionFields = data?.fields?.sideMenu?.fields

  const pageSlug = data?.fields?.slug

  useGtmPageView({
    ecomm_pagetype: String(pageSlug) === 'homepage' ? 'home-page' : '',
  })

  return (
    <>
      <SEO {...data?.fields?.seo?.fields} title={data?.fields?.title} />
      {isPreview && <PreviewBanner />}
      <Breadcrumb
        items={[
          {
            slug: data?.fields?.slug,
            title: data?.fields?.title,
            contentType: data?.sys?.contentType?.sys?.id,
          },
        ]}
      />
      <Flex
        gap={16}
        m="0 auto"
        mt={{ base: 3, md: 12 }}
        px={{ base: 0, lg: 24 }}
        maxW={{ base: 'container.max', lg: '100%' }}
        direction={['column', 'column', 'column', 'row']}
      >
        <Box
          px={{ base: 'mobile', lg: 0 }}
          width={['100%', '100%', '100%', '33%', '32%', '30%', '20%']}
        >
          <Accordion fields={accordionFields} />
        </Box>
        <Box width={['100%', '100%', '100%', '67%', '68%', '70%', '80%']}>
          <ComponentResolver withSideMenu items={pageItems} />
        </Box>
      </Flex>
    </>
  )
}
