// import { EpAddressInterface } from '@myplanetdigital/elasticpath'
// import { UseFormRegister } from 'react-hook-form/dist/types/form'
// import { FieldErrors } from 'react-hook-form/dist/types/errors'
// import * as yup from 'yup'
// import { IntlShape } from 'react-intl'
// import { Dispatch, SetStateAction } from 'react'

export type SelectOptions = {
  label: string
  value: string
}

export const COUNTRIES: SelectOptions[] = [
  { label: 'addressForm.country.US', value: 'US' },
]

export const SHIPPING_ADDRESS_REG_EXP: RegExp[] = [
  /\b(?:P\.?\s*O\.?|Post\s+Office)\s*(?:Box|BX)?\s+\d+\b/i,
  /^BOX/i,
]

export const STATES: Record<string, SelectOptions[]> = {
  US: [
    { value: 'AL', label: 'addressForm.state.US.AL' },
    { value: 'AK', label: 'addressForm.state.US.AK' },
    { value: 'AZ', label: 'addressForm.state.US.AZ' },
    { value: 'AR', label: 'addressForm.state.US.AR' },
    { value: 'CA', label: 'addressForm.state.US.CA' },
    { value: 'CO', label: 'addressForm.state.US.CO' },
    { value: 'CT', label: 'addressForm.state.US.CT' },
    { value: 'DE', label: 'addressForm.state.US.DE' },
    { value: 'DC', label: 'addressForm.state.US.DC' },
    { value: 'FL', label: 'addressForm.state.US.FL' },
    { value: 'GA', label: 'addressForm.state.US.GA' },
    { value: 'HI', label: 'addressForm.state.US.HI' },
    { value: 'ID', label: 'addressForm.state.US.ID' },
    { value: 'IL', label: 'addressForm.state.US.IL' },
    { value: 'IN', label: 'addressForm.state.US.IN' },
    { value: 'IA', label: 'addressForm.state.US.IA' },
    { value: 'KS', label: 'addressForm.state.US.KS' },
    { value: 'KY', label: 'addressForm.state.US.KY' },
    { value: 'LA', label: 'addressForm.state.US.LA' },
    { value: 'ME', label: 'addressForm.state.US.ME' },
    { value: 'MD', label: 'addressForm.state.US.MD' },
    { value: 'MA', label: 'addressForm.state.US.MA' },
    { value: 'MI', label: 'addressForm.state.US.MI' },
    { value: 'MN', label: 'addressForm.state.US.MN' },
    { value: 'MS', label: 'addressForm.state.US.MS' },
    { value: 'MO', label: 'addressForm.state.US.MO' },
    { value: 'MT', label: 'addressForm.state.US.MT' },
    { value: 'NE', label: 'addressForm.state.US.NE' },
    { value: 'NV', label: 'addressForm.state.US.NV' },
    { value: 'NH', label: 'addressForm.state.US.NH' },
    { value: 'NJ', label: 'addressForm.state.US.NJ' },
    { value: 'NM', label: 'addressForm.state.US.NM' },
    { value: 'NY', label: 'addressForm.state.US.NY' },
    { value: 'NC', label: 'addressForm.state.US.NC' },
    { value: 'ND', label: 'addressForm.state.US.ND' },
    { value: 'OH', label: 'addressForm.state.US.OH' },
    { value: 'OK', label: 'addressForm.state.US.OK' },
    { value: 'OR', label: 'addressForm.state.US.OR' },
    { value: 'PA', label: 'addressForm.state.US.PA' },
    { value: 'PR', label: 'addressForm.state.US.PR' },
    { value: 'RI', label: 'addressForm.state.US.RI' },
    { value: 'SC', label: 'addressForm.state.US.SC' },
    { value: 'SD', label: 'addressForm.state.US.SD' },
    { value: 'TN', label: 'addressForm.state.US.TN' },
    { value: 'TX', label: 'addressForm.state.US.TX' },
    { value: 'UT', label: 'addressForm.state.US.UT' },
    { value: 'VT', label: 'addressForm.state.US.VT' },
    { value: 'VA', label: 'addressForm.state.US.VA' },
    { value: 'WA', label: 'addressForm.state.US.WA' },
    { value: 'WV', label: 'addressForm.state.US.WV' },
    { value: 'WI', label: 'addressForm.state.US.WI' },
    { value: 'WY', label: 'addressForm.state.US.WY' },
  ],
}

export const INDUSTRIES: SelectOptions[] = [
  { label: 'industry.automotive', value: 'Automotive' },
  { label: 'industry.beauty', value: 'Beauty' },
  { label: 'industry.builder', value: 'Builder/Developer' },
  { label: 'industry.cafe', value: 'Cafe/Restaurant' },
  { label: 'industry.church', value: 'Church/Religious Organizations' },
  { label: 'industry.city', value: 'City' },
  { label: 'industry.construction', value: 'Construction' },
  { label: 'industry.consumerServices', value: 'Consumer Services' },
  { label: 'industry.dental', value: 'Dental' },
  { label: 'industry.designer', value: 'Designer/Interior Decorator' },
  { label: 'industry.education', value: 'Education' },
  { label: 'industry.energy', value: 'Energy' },
  { label: 'industry.fashion', value: 'Fashion' },
  { label: 'industry.financial', value: 'Financial' },
  { label: 'industry.fineArts', value: 'Fine Arts' },
  { label: 'industry.gaming', value: 'Gaming' },
  { label: 'industry.gov', value: 'Government' },
  { label: 'industry.health', value: 'Health & Wellness' },
  { label: 'industry.hitech', value: 'Hi Tech' },
  { label: 'industry.homeStaging', value: 'Home Staging' },
  { label: 'industry.hospitality', value: 'Hospitality' },
  { label: 'industry.hotel', value: 'Hotel/Motel' },
  { label: 'industry.insurance', value: 'Insurance' },
  { label: 'industry.lawEnforce', value: 'Law Enforcement' },
  { label: 'industry.lawOffice', value: 'Law Office' },
  { label: 'industry.manufacturing', value: 'Manufacturing' },
  { label: 'industry.marketing', value: 'Marketing' },
  { label: 'industry.media', value: 'Media' },
  { label: 'industry.medical', value: 'Medical' },
  { label: 'industry.mining', value: 'Mining' },
  { label: 'industry.nonProfit', value: 'Non Profit' },
  { label: 'industry.other', value: 'Other' },
  { label: 'industry.pharmaceuticals', value: 'Pharmaceuticals' },
  { label: 'industry.property', value: 'Property Management' },
  { label: 'industry.realEstate', value: 'Real Estate' },
  { label: 'industry.resale', value: 'Resale' },
  { label: 'industry.retail', value: 'Retail' },
  { label: 'industry.sports', value: 'Sports/Athletics' },
  { label: 'industry.tax', value: 'Tax Services' },
  { label: 'industry.tv', value: 'Television/Film' },
  { label: 'industry.transport', value: 'Transportation' },
  { label: 'industry.travel', value: 'Travel' },
]
