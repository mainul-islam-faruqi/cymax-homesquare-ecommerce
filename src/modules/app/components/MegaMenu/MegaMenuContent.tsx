import { LinkProps } from '@chakra-ui/react'
import { Maybe, MegaMenuItemFragment } from '@modules/contentful/utils'
import { MegaMenuContentColumns } from './MegaMenuContentColumns'
import { MegaMenuContentThumbnails } from './MegaMenuContentThumbnails'

interface MegaMenuContentProps {
  variant?: string
  data?: Maybe<MegaMenuItemFragment>[]
  linkProps: LinkProps
  closeMenu: () => void
}

export const MegaMenuContent = ({
  variant,
  data,
  linkProps,
  closeMenu,
}: MegaMenuContentProps) => {
  if (variant === 'boxes') {
    return <MegaMenuContentThumbnails data={data} linkProps={linkProps} />
  }

  if (variant === 'columns') {
    return (
      <MegaMenuContentColumns
        data={data}
        linkProps={linkProps}
        closeMenu={closeMenu}
      />
    )
  }

  return null
}
