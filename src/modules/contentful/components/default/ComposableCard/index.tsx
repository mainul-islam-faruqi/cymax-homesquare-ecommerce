import { useCsa } from '@modules/app/pages/CsaLoginPage/hooks'
import { ThemeVariant } from '@modules/contentful/utils/types'
import { clickEvent } from '@modules/gtm/clickEvent'
import { FunctionComponent, useCallback } from 'react'
import { CoverCard } from '../CoverCard'
import { DefaultCard } from '../DefaultCard'
import { WrapperLink } from '../WrapperLink'
import { Card, CardVariant } from './types'

interface ExtendedCard extends Card {
  mainTitle?: string
}

export const ComposableCard: FunctionComponent<ExtendedCard> = ({
  name,
  image,
  cardLink,
  eyebrow,
  title,
  description,
  variant,
  horizontalAlignment,
  verticalAlignment,
  theme,
  mainTitle,
}) => {
  const url = image?.fields?.image?.fields?.file?.url
  const { token: csaToken } = useCsa()
  const handleClickEventGtm = useCallback(() => {
    if (cardLink) {
      const categories = cardLink?.fields?.label
      const url = cardLink?.fields?.url
      clickEvent({
        event: 'clickEvent',
        category: categories || '',
        subcategory: '',
        page_details: url || '',
        section: mainTitle || '',
        clicktext: categories || '',
        loginstatus: csaToken ? 'loggedIn' : 'loggedOut',
      })
    }
  }, [cardLink, mainTitle])
  if (!url) {
    return null
  }

  const renderCard = () => {
    switch (variant) {
      case CardVariant.Cover:
        return (
          <CoverCard
            name={name}
            image={image}
            eyebrow={eyebrow}
            title={title}
            description={description}
            horizontalAlignment={horizontalAlignment}
            theme={theme || ThemeVariant.Dark}
            verticalAlignment={verticalAlignment}
          />
        )
      case CardVariant.Default:
      default:
        return (
          <DefaultCard
            name={name}
            image={image}
            eyebrow={eyebrow}
            title={title}
            description={description}
            horizontalAlignment={horizontalAlignment}
          />
        )
    }
  }

  return (
    <>
      {cardLink ? (
        <div onClick={handleClickEventGtm} style={{ width: '100%' }}>
          <WrapperLink link={cardLink?.fields} width="100%">
            {renderCard()}
          </WrapperLink>
        </div>
      ) : (
        <>{renderCard()}</>
      )}
    </>
  )
}
