import { ItemType, LinksProps } from '@modules/components'
import { LinkVariant } from '@modules/contentful'
import { ThemeVariant } from '@modules/contentful/utils/types'
import { EpFlowFieldValue } from '@myplanetdigital/elasticpath'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

type AccordionOptionsProps = {
  assemblyGuides: string[]
  finish?: EpFlowFieldValue
  material?: EpFlowFieldValue
  style?: EpFlowFieldValue
  brandAbout?: EpFlowFieldValue
  warranty?: EpFlowFieldValue
  height?: EpFlowFieldValue
  width?: EpFlowFieldValue
  productWeight?: EpFlowFieldValue
  length?: EpFlowFieldValue
  name?: string
}

export const useAccordionOptions = ({
  assemblyGuides,
  finish,
  material,
  style,
  brandAbout,
  warranty,
  height,
  width,
  productWeight,
  length,
  name,
}: AccordionOptionsProps) => {
  const intl = useIntl()

  const accordionOptions = useMemo(() => {
    const list = []

    if (finish || material || style) {
      const title = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionDetails',
      })

      const finishLabel = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionFinishLabel',
      })

      const materialLabel = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionMaterialLabel',
      })

      const styleLabel = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionStyleLabel',
      })

      const finishContent = finish
        ? `<p><b>${finishLabel}</b></p><p>${finish}</p><br/>`
        : ''

      const materialContent = material
        ? `<p><b>${materialLabel}</b></p><p>${material}</p><br/>`
        : ''

      const styleContent = style
        ? `<p><b>${styleLabel}</b></p><p>${style}</p>`
        : ''

      const content = `${finishContent}${materialContent}${styleContent}`

      const data: ItemType = {
        id: title,
        title: title,
        links: [{ id: `${title}-content`, content }],
      }
      list.push(data)
    }

    const dimensions = width && height && length

    if (productWeight || dimensions) {
      const title = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionWeightDimensions',
      })
      const heightLabel = height ? `${height}" H x ` : ''
      const widthLabel = width ? `${width}" W x ` : ''
      const lengthLabel = length ? `${length}" D` : ''
      const productWeightLabel = productWeight ? `${productWeight}" lbs` : ''

      const dimensionsLabel = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionDimensionsLabel',
      })
      const weightLabel = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionWeightLabel',
      })

      const weightContent = dimensions
        ? `<p><b>${dimensionsLabel}</b></p><p>${heightLabel} ${widthLabel} ${lengthLabel}</p><br/>`
        : ''
      const productWeightContent = productWeightLabel
        ? `<p><b>${weightLabel}</b></p><p>${productWeightLabel}</p>`
        : ''

      const content = `${weightContent}${productWeightContent}`

      const data: ItemType = {
        id: title,
        title: title,
        links: [{ id: `${title}-content`, content }],
      }

      list.push(data)
    }

    if (!!brandAbout) {
      const title = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionDesignerBrandInformation',
      })

      const data: ItemType = {
        id: title,
        title: title,
        links: [{ id: `${title}-content`, content: `${brandAbout}` }],
      }

      list.push(data)
    }

    if (!!warranty) {
      const title = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionWarranty',
      })

      const data: ItemType = {
        id: title,
        title: title,
        links: [{ id: `${title}-content`, content: `<p>${warranty}</p>` }],
      }

      list.push(data)
    }

    if (!!assemblyGuides && assemblyGuides?.length > 0) {
      const title = intl.formatMessage({
        id: 'productDetailsPage.accordionOptionAssemblyGuideLabel',
      })
      const data: ItemType = {
        id: title,
        title: title,
        links: assemblyGuides?.map((guide: string, index: number) => {
          return {
            fields: {
              name: guide,
              label: `${name} ${assemblyGuides?.length > 1 ? index + 1 : ''}`,
              url: guide,
              variant: LinkVariant.Link,
              buttonChakraProps: {
                whiteSpace: 'normal',
                fontSize: 'sm',
                padding: 4,
                textDecoration: 'underline',
                fontWeight: 'normal',
              },
              textOverflowEllipsis: false,
              theme: ThemeVariant.Light,
            },
            content: '',
            id: `${guide}-content-${index}`,
          } as LinksProps
        }),
      }

      list.push(data)
    }

    return list
  }, [
    assemblyGuides,
    finish,
    material,
    style,
    brandAbout,
    warranty,
    height,
    width,
    productWeight,
    length,
    intl,
    name,
  ])

  return {
    accordionOptions,
  }
}
