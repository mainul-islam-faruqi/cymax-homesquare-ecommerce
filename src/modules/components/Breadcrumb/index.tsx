import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from '@chakra-ui/react'
import { getPageURL } from '@modules/app/utils'
import NextLink from 'next/link'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { BreadcrumbListType, BreadcrumbType } from './types'

export const Breadcrumb = ({
  items,
  basePath,
  ml,
  mt,
  mb,
  my,
}: BreadcrumbType) => {
  const intl = useIntl()

  const base = basePath
    ? basePath
    : {
        title: intl.formatMessage({ id: 'breadcrumbs.home' }),
        url: '/',
      }

  const newBreadCrumbs = useMemo(() => {
    return items.map((item) => ({
      title: item?.title,
      url: getPageURL(item?.contentType || '', item?.slug || ''),
    }))
  }, [items])

  const breadcrumbList = base ? [base, ...newBreadCrumbs] : [...newBreadCrumbs]

  return (
    <>
      {breadcrumbList.length > 0 && (
        <ChakraBreadcrumb
          w="auto"
          mb={mb || '12'}
          mt={mt || '10'}
          ml={ml || '24'}
          my={my}
          color="theme.textMuted"
          fontSize={{ base: 'sm', md: 'base' }}
        >
          {React.Children.toArray(
            breadcrumbList?.map((breadcrumb, idx) => (
              // eslint-disable-next-line react/jsx-key
              <BreadcrumbItem>
                {renderBreadcrumbText(
                  breadcrumb,
                  breadcrumbList.length - 1 === idx
                )}
              </BreadcrumbItem>
            ))
          )}
        </ChakraBreadcrumb>
      )}
    </>
  )
}

const renderBreadcrumbText = (
  breadcrumb: BreadcrumbListType,
  isTheLastItem: boolean
) => (
  <>
    {isTheLastItem ? (
      <Text textTransform="capitalize">{breadcrumb.title}</Text>
    ) : (
      <NextLink href={breadcrumb?.url}>
        <BreadcrumbLink
          href={breadcrumb?.url}
          cursor="pointer"
          textTransform="capitalize"
          _hover={{ textDecoration: 'underline' }}
        >
          {breadcrumb.title}
        </BreadcrumbLink>
      </NextLink>
    )}
  </>
)
