interface OicdProfile {
  next?: string
  current?: string
  last?: string
  prev?: string
  first?: string
}

export interface OicdProfilesResponse {
  meta: any
  data: {
    data: any[]
  }
  links: OicdProfile
}
