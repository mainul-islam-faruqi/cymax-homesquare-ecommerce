import { ContentfulCTA } from "@modules/contentful/pages/types";

export type CTAText = Pick<ContentfulCTA, 'textOverflowEllipsis' | 'label'>

export enum LinkVariant {
  Solid = 'Button - Solid',
  Outline = 'Button - Outline',
  Ghost = 'Button - Ghost',
  Link = 'Link',
}
