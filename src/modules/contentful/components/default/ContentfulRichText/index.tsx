import {
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types'
import { getImageOptions } from '@modules/app/utils'
import { ThemeVariant } from '@modules/contentful/utils/types'
import Link from 'next/link'
import React, {
  FunctionComponent,
  ReactChild,
  ReactFragment,
  ReactPortal,
} from 'react'
import { CallToAction } from '../CallToAction'
import { ComposableImage } from '../ComposableImage'

const RichTextComponent: FunctionComponent<{
  text: Document
  theme?: ThemeVariant
  enableTextCardPadding?: boolean
}> = ({ text, theme = ThemeVariant.Light, enableTextCardPadding = false }) => {
  const defaultOptions = {
    // other options...
    renderNode: {
      // other options...
      [BLOCKS.HEADING_1]: (node: any, children: any) => {
        return (
          <Heading as="h1" size="2xl" fontWeight="extrabold">
            {children}
          </Heading>
        )
      },
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return (
          <Heading as="h2" size="xl">
            {children}
          </Heading>
        )
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return (
          <Heading as="h3" size="lg">
            {children}
          </Heading>
        )
      },
      [BLOCKS.HEADING_4]: (node: any, children: any) => {
        return (
          <Heading as="h4" size="md">
            {children}
          </Heading>
        )
      },
      [BLOCKS.HEADING_5]: (node: any, children: any) => {
        return (
          <Heading as="h5" fontSize={{ base: 'mobile.sm', md: 'desktop.sm' }}>
            {children}
          </Heading>
        )
      },
      [BLOCKS.HEADING_6]: (node: any, children: any) => {
        return (
          <Heading
            as="h6"
            fontWeight={'normal'}
            fontSize={{ base: 'mobile.xs', md: 'desktop.xs' }}
          >
            {children}
          </Heading>
        )
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return (
          <Text
            maxWidth={'full'}
            as="p"
            fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
            paddingBottom={enableTextCardPadding ? 3 : 0}
          >
            {children}
          </Text>
        )
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return (
          <UnorderedList pl={6}>
            {React.Children.toArray(
              children?.map((child: any) => (
                // eslint-disable-next-line react/jsx-key
                <ListItem py={3}>{child?.props?.children}</ListItem>
              ))
            )}
          </UnorderedList>
        )
      },
      [BLOCKS.OL_LIST]: (node: any, children: any) => {
        return (
          <OrderedList pl={6}>
            {React.Children.toArray(
              children?.map((child: any) => (
                // eslint-disable-next-line react/jsx-key
                <ListItem py={3}>{child?.props?.children}</ListItem>
              ))
            )}
          </OrderedList>
        )
      },
      [BLOCKS.QUOTE]: (node: any, children: any) => {
        return (
          <Text
            as="blockquote"
            variant="blockquote"
            sx={{
              borderColor:
                theme === ThemeVariant.Light ? 'shading.900' : 'shading.100',
              color:
                theme === ThemeVariant.Light ? 'shading.900' : 'shading.100',
            }}
          >
            {children}
          </Text>
        )
      },
      [BLOCKS.HR]: (node: any, children: any) => {
        return <hr style={{ width: '100%' }} />
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
        switch (node.data.target.sys.contentType?.sys?.id) {
          case 'image':
            return (
              <ComposableImage
                objectFit={node.data?.target?.fields?.objectFit ?? undefined}
                image={node.data?.target?.fields?.image?.fields}
                alt={node.data?.target?.fields?.alt}
                options={getImageOptions(node.data?.target?.fields)}
              />
            )
          case 'cta':
            return <CallToAction {...node.data?.target?.fields} theme={theme} />
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any, next: any) => {
        return (
          <ComposableImage
            sys={node?.data.target.sys?.id}
            {...node?.data.target.fields}
          />
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        if (node.data.target.sys.contentType?.sys?.id === 'cta') {
          return <CallToAction {...node.data?.target?.fields} theme={theme} />
        }
        return null
      },
      [INLINES.HYPERLINK]: (node: any) => {
        return (
          <Link href={node?.data?.uri} passHref>
            <Text
              as="a"
              color={
                theme && theme === ThemeVariant.Dark
                  ? 'shading.100'
                  : 'shading.900'
              }
              fontSize="sm"
              fontWeight="bold"
              textDecoration="underline"
              lineHeight="tight"
              textUnderlineOffset="4px"
              textDecorationThickness="1px"
              overflow="visible"
              py="4"
              cursor="pointer"
            >
              {node?.content?.[0]?.value}
            </Text>
          </Link>
        )
      },
    },
    // renderText: (text: string) => {
    //   return text.split('\n').reduce((children, textSegment, index) => {
    //     // eslint-disable-next-line react/no-array-index-key
    //     return [...children, index > 0 && <br key={index} />, textSegment]
    //   }, [])
    // },
    renderMark: {
      [MARKS.BOLD]: (
        text:
          | boolean
          | ReactChild
          | ReactFragment
          | ReactPortal
          | null
          | undefined
      ) => <strong>${text}</strong>,
    },
  }

  const options = {
    renderNode: { ...defaultOptions.renderNode },
    // renderMark: defaultOptions.renderMark, // uncomment this is we ever need to override bold, italic, underline and code
    // renderText: defaultOptions.renderText,
  }

  return <>{documentToReactComponents(text, options)}</>
}
export default RichTextComponent
