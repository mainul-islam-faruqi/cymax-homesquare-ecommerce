export interface FormData {
  orderNumberSelect: string
  orderNumberDetails?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  zipCode: string
  firstContact: string
  reason: string
  details?: string
}

type SelectOptions = {
  label: string
  value: string
}

export const YES_NO_OPTIONS: SelectOptions[] = [
  { value: 'Yes', label: 'contactUs.options.yes' },
  { value: 'No', label: 'contactUs.options.no' },
]

export const REASON_OPTIONS: SelectOptions[] = [
  { value: 'Cancel', label: 'contactUs.options.cancel' },
  { value: 'Return', label: 'contactUs.options.return' },
  { value: 'Replace', label: 'contactUs.options.replace' },
  { value: 'Track', label: 'contactUs.options.track' },
  { value: 'Invoice', label: 'contactUs.options.invoice' },
  { value: 'Price Match', label: 'contactUs.options.priceMatch' },
  { value: 'Order Again', label: 'contactUs.options.orderAgain' },
  { value: 'Warranty', label: 'contactUs.options.warranty' },
  { value: 'Address Change', label: 'contactUs.options.addressChange' },
  { value: 'Feedback', label: 'contactUs.options.feedback' },
  { value: 'Shipping Upgrades', label: 'contactUs.options.shippingUpgrades' },
  { value: 'Other', label: 'contactUs.options.other' },
]
