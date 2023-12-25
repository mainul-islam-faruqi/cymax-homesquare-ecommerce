export type LoginOptions = {
  onSuccess?: () => void
}

export type CsaId = {
  id: string
}

export interface EpResponseData {
  meta: Meta
  data: PublicProfileAccessToken[]
  links: Links
}

export interface Meta {
  account_member_id: string
  page: Page
  results: Results
}

export interface Page {
  limit: number
  offset: number
  current: number
  total: number
}

export interface Results {
  total: number
}

export type PublicProfileAccessToken = {
  account_name: string
  account_member_id: string
  account_id: string
  token: string
  type: string
  expires: string
}

export interface Links {
  current: string
  first: string
  last: string
  next: string
  prev: string
}

export interface EpAccountMemberResponse {
  data: AccountMemberData
  links: {
    self: string
  }
}

export interface AccountMemberData {
  id: string
  type: string
  name: string
  email: string
}
